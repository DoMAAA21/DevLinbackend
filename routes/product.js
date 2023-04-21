const express = require("express");

const router = express.Router();

const upload = require("../utils/multer");

const {
  isAuthenticatedUser,

  authorizeRoles,
} = require("../middlewares/auth");

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  getAdminProducts,
  deleteReview,
  productSales
} = require("../controllers/productController");

router.get("/products",getProducts);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"),getAdminProducts);
// router.route("/admin/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
// router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);
router.put('/review',isAuthenticatedUser, createProductReview);
router.get('/reviews',isAuthenticatedUser, getProductReviews);

router.post('/admin/product/new',isAuthenticatedUser, authorizeRoles("admin"), upload.array('images', 10),newProduct);
router.route('/admin/product/:id').put( isAuthenticatedUser, authorizeRoles("admin"),upload.array('images', 10), updateProduct)

router.route('/reviews').delete(isAuthenticatedUser, deleteReview);
router.get(
  "/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getProducts
);

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);

router
  .route("/admin/product/:id")
  // .put( updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get('/admin/products/sales', productSales);

module.exports = router;
