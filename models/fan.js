const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const fanSchema = new Schema({
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  passwordDigest: String,
  name: String,
  image: String,
},{timestamps: true} );

// methods for login go here

fanSchema.statics.createSecure = (email, password, name,gender,callback) => {
  // console.log("I received this email, password :", email, password);
  bcrypt.genSalt((err, salt) => {
    // console.log('brypt salt:', salt)
    bcrypt.hash(password, salt, (err, passwordHAash) => {
      Fan.create({email, passwordDigest: passwordHAash, name, gender}, callback)
    })
  });

};

fanSchema.statics.Auth = (email, password,callback) => {
  // find the fan 
  Fan.findOne({email})
  .then(foundFan => {
    if(!foundFan) {
      callback("Error: no fan found", null)
    }
    else if (foundFan.checkPassword(password))
    {
      callback(null, foundFan)
    }
    else
    {
      callback("Error: wrong password", null)
    }

    console.log('Auth: foundFan', foundFan);
  }).catch(err => console.log(err))

};

fanSchema.methods.checkPassword = function (password)  {
  return bcrypt.compareSync(password, this.passwordDigest);
};

var Fan = mongoose.model("fan", fanSchema);

// export fan model
module.exports = Fan;
