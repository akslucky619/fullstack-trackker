var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema(
  {
    email: {
      type: String
      // required: [true, "Email is Required"],
      // unique: true,
    },
    username: {
      type: String
      // required: true,
    },
    password: {
      type: String
     
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  console.log(this, "register");
  next();
});

userSchema.methods.validatePassword = function(password) {
  console.log(this);
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model("User", userSchema);

module.exports = User;
