// const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please enter your name']
//   },
//   email: {
//     type: String,
//     required: [true, 'Please enter an email'],
//     unique: true,
//     lowercase: true,
//     validate: [isEmail, 'Please enter a valid email']
//   },
//   password: {
//     type: String,
//     required: [true, 'Please enter a password'],
//     minlength: [6, 'Minimum password length is 6 characters'],
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Static method to login user
// userSchema.statics.login = async function(email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('incorrect password');
//   }
//   throw Error('incorrect email');
// };

// // Explicitly specify the collection name as 'personal data'
// const User = mongoose.model('user', userSchema, 'personal data');

// module.exports = User;

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user; // Return user if email and password are correct
    }
    return { error: 'incorrect password' }; // Return specific error for incorrect password
  }
  return { error: 'incorrect email' }; // Return specific error for incorrect email
};

// Explicitly specify the collection name as 'personal data'
const User = mongoose.model('user', userSchema, 'personal data');

module.exports = User;