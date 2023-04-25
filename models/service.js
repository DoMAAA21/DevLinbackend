const mongoose = require("mongoose");



const serviceSchema = new mongoose.Schema({
  name: {
    type: String,

    required: [true, "Please enter name of service"],

    maxLength: [30, "Your name cannot exceed 30 characters"],
  },



  description: {
    type: String,

    required: [true, "Please enter your Description"],

   
  },

  price: {
    type: Number,

    required: [true, "Please enter your Price"],

   
  },

  images: [
    {
      public_id: {
        type: String,

        required: true,
      },

      url: {
        type: String,

        required: false,
      },
    },
  ],


  createdAt: {
    type: Date,

    default: Date.now,
  },


});



module.exports = mongoose.model("Service", serviceSchema);


