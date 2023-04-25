const Service = require("../models/service");
const Order = require("../models/order");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require('cloudinary');

exports.getAdminServices = async (req, res, next) => {



    const services = await Service.find();
  
  
  
    res.status(200).json({
  
        success: true,
  
        services
  
    })
  
  
  
  }

exports.newService = async (req, res, next) => {


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
    
                folder: 'services'
    
            });
    
    
    
            imagesLinks.push({
    
                public_id: result.public_id,
    
                url: result.secure_url
    
            })
    
        }
    
    
    
        req.body.images = imagesLinks
    
   
    
    
    
        const service = await Service.create(req.body);
    
    
    
        res.status(201).json({
    
            success: true,
    
            service
    
        })
    
 }

 exports.deleteService = async (req, res, next) => {
    const service = await Service.findById(req.params.id);
  
    if (!service) {
      return res.status(404).json({
        success: false,
  
        message: "Service not found",
      });
    }
  
    await service.deleteOne();
  
    if (!service) {
      return next(new ErrorHandler("Service not found", 404));
    }
  
    res.status(200).json({
      success: true,
  
      service,
    });
  };

exports.getSingleService = async (req, res, next) => {
    const service = await Service.findById(req.params.id);
  
    console.log(service);
  
    
  
    if (!service) {
      return next(new ErrorHandler("Service not found", 404));
    }
  
    res.status(200).json({
      success: true,
  
      service,
    });
  };

exports.updateService = async (req, res, next) => {



    let service = await Service.findById(req.params.id);
  
  
  
    if (!service) {
  
        return next(new ErrorHandler('Service not found', 404));
  
    }
  
  
  
    let images = []
  
    if (typeof req.body.images === 'string') {
  
        images.push(req.body.images)
  
    } else {
  
        images = req.body.images
  
    }
  
  
  
    if (images !== undefined) {
  
  
  
        // Deleting images associated with the product
  
        for (let i = 0; i < service.images.length; i++) {
  
            const result = await cloudinary.v2.uploader.destroy(service.images[i].public_id)
  
        }
  
  
  
        let imagesLinks = [];
  
  
  
        for (let i = 0; i < images.length; i++) {
  
            const result = await cloudinary.v2.uploader.upload(images[i], {
  
                folder: 'services'
  
            });
  
  
  
            imagesLinks.push({
  
                public_id: result.public_id,
  
                url: result.secure_url
  
            })
  
        }
  
  
  
        req.body.images = imagesLinks
  
  
  
    }
  
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
  
        new: true,
  
        runValidators: true,
  
        useFindAndModify: false
  
    });
  
  
  
    res.status(200).json({
  
        success: true,
  
        service
  
    })
  
  
  
  }

  exports.getServices = async (req, res, next) => {
    const resPerPage = 4;
    const servicesCount = await Service.countDocuments();
  
    const apiFeatures = new APIFeatures(Service.find(), req.query)
      .search()
      .filter();
  
    // let products = await apiFeatures.query;
  
    apiFeatures.pagination(resPerPage);
    services = await apiFeatures.query;
    let filteredServicesCount = services.length;
  
    res.status(200).json({
      success: true,
      servicesCount,
      resPerPage,
      filteredServicesCount,
      services,
    });
  
    // return next(new ErrorHandler("my error", 400));
  };
  