

const express = require('express')

const router = express.Router();

const { newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder,
    totalOrders,
		totalSales,
		customerSales,
		salesPerMonth,
    servicenewOrder

} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')



router.route('/order/new').post( newOrder);
router.route('/serviceorder/new').post( servicenewOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
router.get('/orders/total-orders', totalOrders);
router.get('/orders/total-sales', totalSales);
router.get('/orders/customer-sales', customerSales);
router.get('/orders/sales-per-month', salesPerMonth);
module.exports = router;