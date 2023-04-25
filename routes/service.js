const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
    isAuthenticatedUser,
  
    authorizeRoles,
  } = require("../middlewares/auth");

const {
    getAdminServices,
    newService,
    deleteService,
    getSingleService,
    updateService,
    getServices,
   
  } = require("../controllers/serviceController");

router.route("/admin/services").get(isAuthenticatedUser, authorizeRoles("admin"),getAdminServices);
router.post('/admin/service/new',isAuthenticatedUser, authorizeRoles("admin"), upload.array('images', 10),newService);
router.route("/admin/service/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);
router.route("/admin/service/:id").get(isAuthenticatedUser, authorizeRoles("admin"),getSingleService);
router.route('/admin/service/:id').put( isAuthenticatedUser, authorizeRoles("admin"),upload.array('images', 10), updateService)
router.get("/services",getServices);
router.route("/service/:id").get(getSingleService);
module.exports = router;