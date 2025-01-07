const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 6,
    select: false // hide password field in response
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE
      validator: function(value) {
        return value === this.password; // returns true
      },
      message: 'Passwords do not match'
    }
  }
});
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return next(); // runs the fn only if  password has changed
  // hash the password before saving to the database with cost of 10
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined; // remove passwordConfirm field from the database
  next();
});

// instance method
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// model variables start with capital letters
const User = mongoose.model('User', userSchema);

module.exports = User;
