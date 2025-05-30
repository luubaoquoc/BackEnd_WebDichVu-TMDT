const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require("../middleware/authMiddleware");


router.post('/create-product', authMiddleware, ProductController.createProduct)
router.put('/update-product/:id', authMiddleware, ProductController.updateProduct)
router.get('/details-product/:id', ProductController.getDetailsProduct)
router.delete('/delete-product/:id', authMiddleware, ProductController.deleteProduct)
router.get('/all-product/', ProductController.getAllProduct)

module.exports = router;
