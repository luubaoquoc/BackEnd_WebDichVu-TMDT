const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        product_name: { type: String, required: true },
        product_price: { type: Number, required: true },
        product_image: { type: String, required: true },
        product_brand: { type: String, required: true },
        product_category: { type: String, required: true },
        product_countInStock: { type: Number, required: true },
        product_description: { type: String },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;