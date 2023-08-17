const express = require("express")
const router = express.Router()
const Category = require("../models/category.model")
const Product = require("../models/product.model")

router.get("/:categoryName", 
    async function(req, res)
    {
        const name = req.params.categoryName
        const category = await Category.findOne({"name": name})
        const categories = await Category.find({})
        const products = await Product.find({"categoryName": name})

        return res.render("category.ejs", {
            category: category,
            categories: categories,
            products: products
        })
    }
)

module.exports = router