const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");


// mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: [true, "Please enter your name"],

    maxLength: [30, "Your name cannot exceed 30 characters"],
  },

  email: {
    type: String,

    required: [true, "Please enter your email"],

    unique: true,

    validate: [validator.isEmail, "Please enter valid email address"],
  },

  password: {
    type: String,

    required: [true, "Please enter your password"],

    minlength: [6, "Your password must be longer than 6 characters"],

    select: false,
  },

  avatar: {
    public_id: {
      type: String,

      required: true,
    },

    url: {
      type: String,

      required: true,

      default: "https://wallpapercave.com/wp/wc1700893.jpg",
    },
  },

  role: {
    type: String,

    default: "user",
  },

  googleId: {
    type: String,
    required:false,
  },

  secret: {
    type: String,

    required:false,
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },

  resetPasswordToken: String,

  resetPasswordExpire: Date,
});

// uncomment to test bcrypt

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  // Generate token

  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

// Return JWT token

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);


// const User = new mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);


// passport.use(User.createStrategy());
// passport.serializeUser(function(user, done) {

//   console.log(user)
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
// passport.use(new GoogleStrategy({
//     clientID: '175394507059-ns349vm9qa77nuohems8bmg1viga77e1.apps.googleusercontent.com',
//     clientSecret:'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',
//     callbackURL: "http://localhost:4000/auth/google/callback",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
// function(accessToken, refreshToken, profile, cb) {
//     // console.log(profile)
//     // console.log(cb)

//     //  User.find({googleId: profile.id}
//     //   , function (err, user) {
//     //       return cb(err, user);
//     //     });
    
//     // console.log(user.name);
    
  
   


//     //  User.find({  googleId: profile.id,
     
//     //   //  name: profile.displayName,
//     //   //  email: profile.name.givenName + profile.name.familyName + '@gmail.com',
//     //   //  password:'hatdog1234',
//     //   //  avatar: {
//     //   //   public_id: 'avatars/rjeu182thkednbnlitqc',
  
//     //   //   url: 'https://res.cloudinary.com/dxqnpv8xc/image/upload/v1680966709/avatars/rjeu182thkednbnlitqc.jpg',
//     //   // },
    
    
    
//     // }, function (err, user) {
//     //   return cb(err, user);
//     // });

//     User.findOrCreate({  googleId: profile.id,
     
    
    
    
//     }, function (err, user) {
//       return cb(err, user);
//     });
//    }
// ));
