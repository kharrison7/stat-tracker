let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
 username:  {type: String, lowercase: true},
 date: {type: String, lowercase: true},
 activity: {type: String, lowercase: true},
 amount: Number,
 amountType: {type: String, lowercase: true}
 // id: Number,
 // sessionID: {type: String}
  },
  {timestamps: true}
);


let User = mongoose.model('User', userSchema);
module.exports = {
  User
}
