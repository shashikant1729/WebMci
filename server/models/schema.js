const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("mongoose-type-url");

dateString = "Wed Mar 19 00:30:00 IST 1997";
var date = new Date(dateString.replace("IST", ""));

// let day = date.getDate();
// let month = date.getMonth()+1;
// let year = date.getFullYear();

// console.log()

const userschema = new mongoose.Schema({
	name: {
		type: String,
		// required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		// required: true,
	},
	work: {
		type: String,
		// required: true,
	},
	password: {
		type: String,
		// required: true,
	},
	cpassword: {
		type: String,
		// required: true,
	},
	web_facebook: {
		type: mongoose.SchemaTypes.Url,
	},
	web_insta: {
		type: mongoose.SchemaTypes.Url,
	},
	web_linkedin: {
		type: mongoose.SchemaTypes.Url,
	},
	web_work: {
		type: mongoose.SchemaTypes.Url,
	},
	image: {
		type: String,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	date: {
		type: String,
		default: new Date(),
	},
	messages: [
		{
			name: {
				type: String,
				// required: true,
			},
			email: {
				type: String,
				required: true,
			},
			phone: {
				type: Number,
				// required: true,
			},
			message: {
				type: String,
				// required: true,
			},
			date: {
				type: String,
				default:
					"Date: " +
					new Date().toLocaleDateString() +
					" Time: " +
					new Date().toLocaleTimeString(),
			},
		},
	],
});

//hasing the password, pre means to call function before saving the data
userschema.pre("save", async function (req, res, next) {
	//next is necessary parameter
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
		this.cpassword = await bcrypt.hash(this.cpassword, 12);
	} //isModified is required to be more specific
	next();
});

userschema.methods.generateAuthToken = async function () {
	try {
		let tokencreate = jwt.sign({ _id: this._id }, process.env.KEY); //jwt.sign(payload. secretKey, [option , callback])
		this.tokens = this.tokens.concat({ token: tokencreate });
		await this.save();

		return tokencreate;
	} catch (err) {
		console.log(err);
	}
};

//for storing the message by instance or methods
userschema.methods.addMessage = async function (name, email, phone, message) {
	try {
		this.messages = this.messages.concat({ name, email, phone, message });
		// this.messages[0].date = this.messages[0].date.toString();

		await this.save();
		return this.message;
	} catch (error) {
		console.log(error);
	}
};

const user = mongoose.model("user", userschema);

module.exports = user;
