// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   posts:{
//     post:{Array},
//     postedAt:{type:Date}
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String }, // <-- added bio field
  posts: {
    post: { type: Array },
    postedAt: { type: Date },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
