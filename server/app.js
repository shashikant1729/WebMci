const env = require("dotenv");
const express = require("express");
const app = express();
const cookies = require("cookie-parser");
const port = 5000 || process.env.PORT;
//securing password and essential data
env.config({ path: "./config.env" });
app.use(cookies())
// const cors = require("cors");
// app.use(
// 	cors({
// 		origin: "*",
// 	})
// );
//connection
require("./db/connect");

//database
const User = require("./models/schema");

//rout

app.use(express.json());
app.use(express.urlencoded({
	extended: false
  })); //again for to show data from post method via html page
app.use(require("./routers/auth"));

//Middleware (let before going to aboutme page, we ahve to check the user
// is  genuin or not)
// const middleware = (req, res, next) => {
// 	//here 3rd parameter means not to stop after checking, you have to procced
// 	console.log("hello this middleware");
// 	next(); //rhi allow to render aboutme
// };

app.get("/", (req, res) => {
	res.status(200).send("home , hello  MERN Stack Developer");
});
// middleware() // this is call where we have to check the authentication
// app.get("/aboutme", middleware, (req, res) => {
// 	res.status(200).send("aboutme, hello MERN Stack Developer");
// });
// app.get("/contact", (req, res) => {
// 	res.status(200).send("contact, hello MERN Stack Developer");
// });
// app.get("/signin", (req, res) => {
// 	res.status(200).send("signin, hello MERN Stack Developer");
// });
// app.get("/signup", (req, res) => {
// 	res.status(200).send("signup, hello MERN Stack Developer");
// });
app.listen(port, () => {
	console.log(`server run at ${port}`);
});

// console.log('hello its works');
