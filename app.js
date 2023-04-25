const express = require("express");
const session = require('express-session')
const app = express();

// const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const auth = require("./routes/auth");

// const User = require("./routes/auth");
const errorMiddleware = require("./middlewares/error");
const product = require("./routes/product");
const order = require("./routes/order");
const service = require("./routes/service");


// const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

// app.use(session({secret: 'Your_Secret_Key', resave: true, saveUninitialized: true}))

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
// const cors = require('cors');

// app.use(bodyParser());

// app.use(
//     bodyParser.urlencoded({
//       extended: true,
      
//     })
//   );
// app.use(fileUpload());
// app.use(multer());
// const fileupload = require('express-fileupload'); 

// app.use(fileUpload({useTempFiles: true}))
// app.use(cors({
//     origin: "https://localhost:3000",
//     credentials: true}));


// app.use(session(
//     { name:'SessionCookie',
//       genid: function(req) {
//           console.log('session id created');
//         return genuuid();}, 
//       secret: 'Shsh!Secret!',
//       resave: false,
//       saveUninitialized: false,
//       cookie: { secure: false,expires:60000 }
//     }));




const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// app.use(cors());



app.use(cors({
    origin: 'http://localhost:3000',
 
    // origin: "https://localhost:3000",
    credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use("/api/v1", auth);
app.use("/api/v1", product);
app.use('/api/v1', order);
app.use('/api/v1', service);
app.use(errorMiddleware);


// app.get("/auth/google",
//   passport.authenticate("google", { scope:
//   	[ 'email', 'profile' ] })
// );
// app.get("/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
//   function(req, res) {
//     // Successful authentication, redirect secrets.

    
//     res.redirect("http://localhost:3000");
//   }
// );

// app.get("/logout", function(req, res){
//   res.redirect("http://localhost:3000/");
// });

module.exports = app;