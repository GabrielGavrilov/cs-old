const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
    name: String,
    description: String
})

const shopModel = new mongoose.model("categorie", shopSchema)
module.exports = shopModel