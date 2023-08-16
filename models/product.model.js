const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productPicture: String,
    productName: String,
    productDescription: String,
    price: Number,
    shopName: String
})

const productModel = new mongoose.model('product', productSchema)
module.exports = productModel;