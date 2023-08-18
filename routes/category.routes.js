const express = require("express")
const router = express.Router()
const Category = require("../models/category.model")
const Product = require("../models/product.model")
const Subcategory = require("../models/subcategory.model")

router.get("/:categoryName", 
    async function(req, res)
    {
        const name = req.params.categoryName
        const categories = await Category.find({})
        const category = await Category.findOne({"name": name})
        const subcategories = await Subcategory.find({'categoryName': name})
        const products = await Product.find({"categoryName": name})

        return res.render("category.ejs", {
            categories: categories,
            category: category,
            subcategories: subcategories,
            products: products
        })
    }
)

router.post("/:categoryName/subcategory/", 
    async function(req, res)
    {
        const name = req.params.categoryName
        const categories = await Category.find({})
        const category = await Category.findOne({"name": name})
        const subcategories = await Subcategory.find({'categoryName': name})
        const products = await Product.find({"categoryName": name, "subcategoryName": req.body.subcategoryName})

        return res.render("category.ejs", {
            categories: categories,
            category: category,
            subcategories: subcategories,
            products: products
        })
    }
)

router.get("/:categoryName/product/:productId",
    async function(req, res)
    {
        const id = req.params.productId
        const product = await Product.findById(id)
        const categories = await Category.find({})

        return res.render("product.ejs",
        {
            categories: categories,
            product: product
        })
    }
)

module.exports = router