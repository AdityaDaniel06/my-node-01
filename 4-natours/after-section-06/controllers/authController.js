/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.login = async function(req, res) {
  try {
    const { email, password } = req.body;
    //1) Check if email and password exists
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!'
      });
    }
    // 2) Check if user exits and password is correct
    const user = await User.findOne({ email }).select('+password'); //--> to add back password in response

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Please check email or password!'
      });
    }
    // 3) if everything is Ok , send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid data!'
    });
  }
};
