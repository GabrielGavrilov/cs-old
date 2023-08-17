const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    picture: String,
    name: String,
    description: String,
    price: Number,
    categoryName: String
})

const productModel = new mongoose.model('product', productSchema)
module.exports = productModel;