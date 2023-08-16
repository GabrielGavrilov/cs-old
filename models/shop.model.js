const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
    shopName: String,
    shopDescription: String
})

const shopModel = new mongoose.model("shop", shopSchema)
module.exports = shopModel