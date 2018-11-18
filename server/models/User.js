const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

userSchema.statics.findOrCreate = async function(author, email) {
  const found = await User.findOne({email: email})
  console.log('found', found)
  if(found) return found
  else {
    const user = new User({
      name: author,
      email: email
    })
    return user.save()
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
