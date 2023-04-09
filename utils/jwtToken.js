
// const sendToken = (user, statusCode, res) => {
//   // Create Jwt token

//   const token = user.getJwtToken();

//   // Options for cookie

//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
//     ),

//     httpOnly: true,
//   };

//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     token,
//     user,
//   });
// };

const sendToken = (user, statusCode, res) => {

    



    // Create Jwt token
    const token = user.getJwtToken();
  
    // sessionStorage.setItem("token", token);
    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        samesite: 'none',
    }
   const hat =  res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })

    console.log(hat)

    
  
  }
  
  module.exports = sendToken;
  