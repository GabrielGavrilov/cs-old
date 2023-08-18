const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    name: String,
    categoryName: String
})

const subcategoryModel = new mongoose.model("subcategorie", subcategorySchema)
module.exports = subcategoryModel