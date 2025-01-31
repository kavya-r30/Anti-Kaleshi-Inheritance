const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  country: {
    type: String,
    default: ''
  },
  picture: {
    type: String,
    default: 'https://api.dicebear.com/7.x/avataaars/svg'
  },
  bio: {
    type: String,
    default: ''
  },
  platforms: {
    leetcode: { type: String, default: '' },
    codeforces: { type: String, default: '' },
    codechef: { type: String, default: '' },
    geeksforgeeks: { type: String, default: '' },
    atcoder: { type: String, default: '' }
  },
  socialLinks: {
    github: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    resume: { type: String, default: '' }
  },
  education: {
    degree: { type: String, default: '' },
    university: { type: String, default: '' },
    year: { type: String, default: '' }
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// userSchema.statics.login = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user; // Return user if email and password are correct
//     }
//     return { error: 'incorrect password' }; // Return specific error for incorrect password
//   }
//   return { error: 'incorrect email' }; // Return specific error for incorrect email
// };

const User = mongoose.model('User', userSchema);
module.exports = User;