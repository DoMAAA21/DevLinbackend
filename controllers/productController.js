const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require('cloudinary');
exports.getProducts = async (req, res, next) => {
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();
  
    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();
  
    // let products = await apiFeatures.query;
  
    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query;
    let filteredProductsCount = products.length;
  
    res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      products,
    });
  
    // return next(new ErrorHandler("my error", 400));
  };

  exports.getAdminProducts = async (req, res, next) => {



    const products = await Product.find();
  
  
  
    res.status(200).json({
  
        success: true,
  
        products
  
    })
  
  
  
  }


  exports.newProduct = async (req, res, next) => {


console.log(req.body)
    let images = []

    if (typeof req.body.images === 'string') {

        images.push(req.body.images)

    } else {

        images = req.body.images

    }



    let imagesLinks = [];



    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {

            folder: 'products'

        });



        imagesLinks.push({

            public_id: result.public_id,

            url: result.secure_url

        })

    }



    req.body.images = imagesLinks

    // req.body.user = req.user.id;



    const product = await Product.create(req.body);



    res.status(201).json({

        success: true,

        product

    })

}

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,

      message: "Product not found",
    });
  }

  await product.deleteOne();

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,

    product,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  console.log(product);

  

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,

    product,
  });
};

exports.updateProduct = async (req, res, next) => {



  let product = await Product.findById(req.params.id);



  if (!product) {

      return next(new ErrorHandler('Product not found', 404));

  }



  let images = []

  if (typeof req.body.images === 'string') {

      images.push(req.body.images)

  } else {

      images = req.body.images

  }



  if (images !== undefined) {



      // Deleting images associated with the product

      for (let i = 0; i < product.images.length; i++) {

          const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)

      }



      let imagesLinks = [];



      for (let i = 0; i < images.length; i++) {

          const result = await cloudinary.v2.uploader.upload(images[i], {

              folder: 'products'

          });



          imagesLinks.push({

              public_id: result.public_id,

              url: result.secure_url

          })

      }



      req.body.images = imagesLinks



  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {

      new: true,

      runValidators: true,

      useFindAndModify: false

  });



  res.status(200).json({

      success: true,

      product

  })



}


  