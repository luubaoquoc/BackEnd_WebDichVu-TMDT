const ProductServices = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { product_name, product_price, product_image, product_brand, product_category, product_countInStock, product_description } = req.body;
        console.log('data', req.body)
        if (!product_name || !product_price || !product_image || !product_brand || !product_category || !product_countInStock) {
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required',
            });
        }
        const response = await ProductServices.createProduct(req.body);
        return res.status(201).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'Product id is required',
            });
        }
        const response = await ProductServices.updateproduct(productId, data);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page } = req.query
        const response = await ProductServices.getAllProduct(Number(limit) || 8, Number(page) || 0);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'The ProductId is required',
            });
        }
        const response = await ProductServices.getDetailsProduct(productId);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('productID', productId)
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'productId is required',
            });
        }
        const response = await ProductServices.deleteProduct(productId);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getDetailsProduct,
    deleteProduct
};