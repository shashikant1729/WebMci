const jwt = require("jsonwebtoken");
const User = require("../models/schema");
const middleware_about = async (req, res, next) => {
	try {
		const token = req.cookies.jwtlogin;
		// console.log(token);
		const verifyToken = jwt.verify(token, process.env.KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			throw new Error("User not found");
		} else {
			req.token = token;
			req.rootUser = rootUser;
			req.userID = rootUser._id;
		}
		next();
	} catch (error) {
		res.status(401).json({ error: "invalid :no token found" });
		console.log(error);
	}
};

module.exports = middleware_about;
