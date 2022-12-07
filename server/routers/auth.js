const express = require("express");
const user = require("../models/schema");
const router = express.Router();
require("../db/connect");
const User = require("../models/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
	res.status(200).send("home , hello from rout  MERN Stack Developer");
});
const middleware_about = require("../middleware/about");
const multer = require("multer");

//using promise
// router.post("/register", (req, res) => {
// 	const { name, email, phone, work, password, cpassword } = req.body; //obejct destructuring
// 	if (!name || !email || !phone || !work || !password || !cpassword) {
// 		return res.status(400).send("Kindly fill all field");
// 	}
// 	User
// 		.findOne({ email: email })
// 		.then((userExist) => {
// 			//userExit give the result of email==email or not
// 			if (userExist) {
// 				return res.status.send("User already exist !!");
// 			}
// 			const user = new User({
// 				name,
// 				email,
// 				phone,
// 				work,
// 				password,
// 				cpassword,
// 			});
// 			user
// 				.save()
// 				.then(() => {
// 					res.status(201).json({ message: "data saved successfully" });
// 				})
// 				.catch((err) => {
// 					res.status(500).json({ error: "failed to save data" });
// 				});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});

// 	console.log(name);
// 	console.log(email);
// 	console.log(work);
// 	console.log(phone);
// 	// res.json({ message: req.body });
// 	// res.send('hello register run ')
// });

//hasing password before saving the data in database, wjust before the saving i.e pre save method

//for image upload
const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/upload");
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		let file_name = file.originalname.split(".")[0];
		file_name = file_name.replace(/ /g, "");
		cb(null, `${file_name}.${ext}`);
	},
});

// Multer Filter
const multerFilter = (req, file, cb) => {
	if (file.mimetype.split("/")[1] === "svg") {
		cb(null, true);
	} else if (file.mimetype.split("/")[1] === "png") {
		cb(null, true);
	} else if (file.mimetype.split("/")[1] === "jpg") {
		cb(null, true);
	} else {
		cb(null, true);
		// cb(new Error("Not a PDF File!!"), false);
	}
};

//Calling the "multer" Function
const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
	limits: {
		fileSize: 10000000, // 1000000 Bytes = 1 MB
	},
});

//using async
router.post("/register", upload.single("image"), async (req, res) => {
	// res.setHeader('Access-Control-Allow-Origin', '*');
	const {
		name,
		email,
		phone,
		work,
		password,
		cpassword,
		web_facebook,
		web_insta,
		web_linkedin,
		web_work,
	} = req.body; //obejct destructuring
	let file_name = req.file.originalname.split(".")[0];
	file_name = file_name.replace(/ /g, "");
	const image = `${file_name}.${req.file.mimetype.split("/")[1]}`;
	if (!name || !email || !phone || !work || !password || !cpassword) {
		return res.status(400).json({ error: "Kindly fill all field" });
	}
	try {
		const userExist = await User.findOne({ email: email });
		if (userExist) {
			return res.status(400).json({ error: "User already exist !!" });
		} else if (password !== cpassword) {
			return res
				.status(400)
				.json({ error: "kindly filled the correct cpassword" });
		} else {
			const user = new User({
				name,
				email,
				phone,
				work,
				password,
				cpassword,
				web_facebook,
				web_insta,
				web_linkedin,
				web_work,
				image,
			});
			console.log(req.file.filename);
			console.log(req.file);
			const userRegister = await user.save();
			if (userRegister) {
				return res.status(201).json({ message: "data saved successfully" });
			}
			res.status(400).json({ error: "failed to save data" });
		}
	} catch (error) {
		res.status(400).json({ error: "failed to save data" });
		console.log(error);
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(401).json({ error: "kindly fill the field" });
	}
	try {
		const signin = await user.findOne({ email: email });
		if (signin) {
			const isMatch = await bcrypt.compare(password, signin.password);
			const token = await signin.generateAuthToken();
			res.cookie("jwtlogin", token, {
				// expires: new Date(Date.now() + 60000),
				httpOnly: true,
			});
			// console.log(token);

			if (isMatch) {
				return res.status(200).json({ message: `welcome back ${signin.name}` });
			} else {
				return res.status(401).json({ error: "login failed password" });
			}
		}
		return res.status(401).json({ error: "login failed email" });
	} catch (error) {
		res.status(401).json({ error: "login failed" });
		console.log(error);
	}
});

router.get("/about", middleware_about, async (req, res) => {
	try {
		res.status(200).send(req.rootUser);
		// console.log("about page");
	} catch (error) {
		res.status(401).send({
			error: "failed to signin",
		});
	}
});

//for about us and Home page
router.get("/getdata", middleware_about, async (req, res) => {
	try {
		res.send(req.rootUser);
	} catch (error) {
		console.log(error);
	}
});

router.get("/allusers",middleware_about, async (req, res) => {
	try {
		const allusers = await User.find();
		console.log(allusers);
		res.status(201).send(allusers);
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
	}
});

//for contact us and Home page
router.post("/contact", middleware_about, async (req, res) => {
	try {
		const { name, email, phone, message } = req.body;
		if (!name || !email || !phone || !message) {
			res.status(401).send({ message: "kindly sigin in" });
		}
		const userContact = await User.findOne({ _id: req.userID });
		if (userContact) {
			const userMessage = await userContact.addMessage(
				name,
				email,
				phone,
				message
			);
			// await userContact.save();
			res.status(201).send({ message: "message saved successfully" });
		}
	} catch (error) {
		res.status(401).send({ message: "error msg" });
	}
});

//logout route
router.get("/user/Logout", (req, res) => {
	console.log("logout page here");
	res.clearCookie("jwtlogin", { path: "/" });
	res.status(200).send("user logout");
});

module.exports = router;
