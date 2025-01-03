const User = require("../models/User");
const Internship = require("../models/Internship");
const Company = require("../models/Company");
const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Events = require('../models/Events');

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
  let errors = { ID: "", password: "" };
  console.log(err);

  //incorrect email
  if (err.message === "incorrect ID") {
    errors.ID = "Incorrect ID or password";
    return errors;
  }

  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Incorrect ID or password";
    return errors;
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.ID = "That ID is already registered";
    return errors;
  }
  //validate errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//creating tokens
const secret = "aer34tsdfq34taasdfadfadfadfad";
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, ID) => {
  return jwt.sign({ id, ID }, secret, {
    expiresIn: maxAge,
  });
};
module.exports.signup_get = (req, res) => {
  res.send("ok");
};

module.exports.login_get = (req, res) => {
  console.log("logingetcookie", req.cookies);
  res.send(req.cookies);
};

module.exports.signup_post = async (req, res) => {
  console.log(req.body);
  const { ID, userName, password } = req.body;

  try {
    const user = await User.create({ ID, userName, password });
    console.log("From signup post after user being created ", user);
    const token = createToken(user._id, user.ID);
    res.cookie("token", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
      sameSite: "None", // Ensure cross-site cookies are allowed
      secure: true, // Ensure the cookie is only sent over HTTPS
    });

    res.status(201).json({ id: user._id.toString(), ID: user.ID });
  } catch (err) {
    const errors = handleErrors(err);
    // console.log("my error", { errors });
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { ID, password } = req.body;
  // console.log(req.body);
  try {
    const user = await User.login(ID, password);
    const token = createToken(user._id, user.ID);
    res.cookie("token", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
      sameSite: "None", // Ensure cross-site cookies are allowed
      secure: true, // Ensure the cookie is only sent over HTTPS
    });
    
    res.status(200).json({ id: user._id, ID: user.ID });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ suc: true });
  // res.redirect('/')
};

module.exports.profile_get = (req, res) => {
  const { token } = req.cookies;
  // console.log("token = ", token);
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log("Iam from profile ", info);
    res.json(info);
  });
};

module.exports.internshipData_post = async (req, res) => {
  const { ID, companyName, projectName, description, mode } = req.body;
  let UID = ID.toUpperCase();
  console.log(req.body, UID);
  try {
    const internData = await Internship.create({
      ID: UID,
      companyName,
      projectName,
      description,
      mode,
    });
    console.log(internData);
    res.status(201).json(internData);
  } catch (err) {
    console.log(err);
    res.status(400).json("Enter all fields");
  }
};
module.exports.internshipData_get = async (req, res) => {
  try {
    const { batch } = req.params;
    const internData = await Internship.find({
      ID: { $regex: `^${batch}` },
    });
    res.json(internData);
  } catch (err) {
    res.status(400).json("Unable to fetch");
  }
};


module.exports.tnpData_get = async (req, res) => {
    try {
      const { batch } = req.params;
      const tnpData = await Company.find({
        ID: { $regex: `^${batch}` },
      });
      res.json(tnpData);
    } catch (err) {
      res.status(400).json("Unable to fetch");
    }
  };

module.exports.resumeScore_post 
