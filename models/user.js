const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  passwordDigest: String,
  name: String,
  gender: String,
  image: String,
  contact: {Address, City, Phone},
  bio : String,
  accounts: {},
  posts :[{type : mongoose.Schema.Types.ObjectId , ref : 'post'  }]
  // rate: String,
  // comments: []

},{timestamps: true} );

// methods for login go here

UserSchema.statics.createSecure = (email, password,callback) => {
  // console.log("I received this email, password :", email, password);
  bcrypt.genSalt((err, salt) => {
    // console.log('brypt salt:', salt)
    bcrypt.hash(password, salt, (err, passwordHAash) => {
      User.create({email, passwordDigest: passwordHAash, name, gender}, callback)
    })
  });

};

UserSchema.statics.Auth = (email, password,callback) => {
  // find the user 
  User.findOne({email})
  .then(foundUser => {
    if(!foundUser) {
      callback("Error: no user found", null)
    }
    else if (foundUser.checkPassword(password))
    {
      callback(null, foundUser)
    }
    else
    {
      callback("Error: wrong password", null)
    }

    console.log('Auth: foundUser', foundUser);
  }).catch(err => console.log(err))

};

UserSchema.methods.checkPassword = function (password)  {
  return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;
