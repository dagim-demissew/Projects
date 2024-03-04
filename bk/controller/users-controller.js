const { validationResult } = require("express-validator");
const uuid = require("uuid");

const HttpError = require("../model/http-error");
const User = require("../model/user");
const Place = require("../model/place");

const getUsers = async (req, res, next) => {
  
  let users;
  try{
    users = await User.find({}, '-password');
  }catch(err){
    return next( new HttpError('could not find users', 500));
  }
  res.json({users: users.map(user => user.toObject({getters:true}))})
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs!", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("findOne method failed", 500));
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists, use a different email",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: "https://images.app.goo.gl/GdB4SRwJqtp19TvG6",
    password,
    places: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Sign up failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("findOne method in login failed", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Could not identify user, Incorrect credentials", 401)
    );
  }
  res.json({ message: "logged in!" });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
