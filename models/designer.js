const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const designerSchema = new Schema({
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  passwordDigest: String,
  name: String,
  gender: String,
  image: String,
  phone: String,
  city: String,
  address: String,
  bio : String,
},{timestamps: true} );

// methods for login go here

designerSchema.statics.createSecure = (email, password,name,gender,callback) => {
  // console.log("I received this email, password :", email, password);
  bcrypt.genSalt((err, salt) => {
    // console.log('brypt salt:', salt)
    bcrypt.hash(password, salt, (err, passwordHAash) => {
      Designer.create({email, passwordDigest: passwordHAash, name, gender}, callback)
    })
  });

};

designerSchema.statics.Auth = (email, password,callback) => {
  // find the designer 
  Designer.findOne({email})
  .then(foundDesigner => {
    if(!foundDesigner) {
      callback("Error: no designer found", null)
    }
    else if (foundDesigner.checkPassword(password))
    {
      callback(null, foundDesigner)
    }
    else
    {
      callback("Error: wrong password", null)
    }

    console.log('Auth: foundDesigner', foundDesigner);
  }).catch(err => console.log(err))

};

designerSchema.methods.checkPassword = function (password)  {
  return bcrypt.compareSync(password, this.passwordDigest);
};

//create index for search founction to work
designerSchema.index({ name: 'text' })

var Designer = mongoose.model("designer", designerSchema);

// export designer model
module.exports = Designer;
