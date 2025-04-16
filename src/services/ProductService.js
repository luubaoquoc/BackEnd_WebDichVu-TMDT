const Product = require('../models/ProductsModel');
const bcrypt = require('bcrypt');


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { product_name, product_price, product_image, product_brand, product_category, product_countInStock, product_description } = newProduct;
        try {
            const checkProduct = await Product.findOne({ product_name });
            if (checkProduct) {
                resolve({
                    status: 'error',
                    message: 'The name of product is already exist'
                });
            }
            const createProduct = await Product.create({
                product_name,
                product_price,
                product_image,
                product_brand,
                product_category,
                product_countInStock,
                product_description
            });
            if (createProduct) {
                resolve({
                    status: 'success',
                    message: 'product created successfully',
                    data: createProduct
                });
            }
        } catch (error) {
            reject(error);
        }
    }
    )
}

const updateproduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById({
                _id: id
            });
            console.log(checkProduct);
            if (!checkProduct) {
                resolve({
                    status: 'error',
                    message: 'The Product is not defined'
                });
            }
            const updateproduct = await Product.findByIdAndUpdate(id, data, { new: true });
            if (updateproduct) {
                resolve({
                    status: 'success',
                    message: 'User updated successfully',
                    data: updateproduct
                });
            }
        } catch (error) {
            reject(error);
        }
    }
    )
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById({
                _id: id
            });
            if (!checkProduct) {
                resolve({
                    status: 'error',
                    message: 'The Product not found'
                });
            }
            await Product.findByIdAndDelete(id);
            resolve({
                status: 'success',
                message: 'The Product delete successfully',
            });

        } catch (error) {
            reject(error);
        }
    }
    )
}

const getAllProduct = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            const allProduct = await Product.find().limit(limit).skip(page * limit);
            resolve({
                status: 'success',
                message: ' successfully',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (error) {
            reject(error);
        }
    }
    )
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById({
                _id: id
            });
            if (!product) {
                resolve({
                    status: 'error',
                    message: 'The Poduct not found'
                });
            }
            resolve({
                status: 'success',
                message: 'SUCCESS',
                data: product

            });

        } catch (error) {
            reject(error);
        }
    }
    )
}


module.exports = {
    createProduct,
    updateproduct,
    getAllProduct,
    getDetailsProduct,
    deleteProduct
};