const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require('../middleware/uploadMiddleware');


router.post('/create-product', authMiddleware, upload.single('product_image'), ProductController.createProduct)
router.put('/update-product/:id', authMiddleware, upload.single('product_image'), ProductController.updateProduct)
router.get('/details-product/:id', ProductController.getDetailsProduct)
router.delete('/delete-product/:id', authMiddleware, ProductController.deleteProduct)
router.get('/all-product/', ProductController.getAllProduct)

module.exports = router;
