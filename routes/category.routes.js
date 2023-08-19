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

        if(category)
        {
            return res.render("category.ejs", {
                categories: categories,
                category: category,
                subcategories: subcategories,
                products: products
            })
        }
        else
        {
            return res.redirect("/")
        }
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

        if(category)
        {
            return res.render("category.ejs", {
                categories: categories,
                category: category,
                subcategories: subcategories,
                products: products
            })
        }
        else
        {
            return res.redirect("/")
        }
    }
)

router.get("/:categoryName/product/:productId",
    async function(req, res)
    {
        const product = await Product.findOne({"id": req.params.id, "categoryName": req.params.categoryName})
        const categories = await Category.find({})

        if(product)
        {
            return res.render("product.ejs", {
                categories: categories,
                product: product
            })
        }
        else
        {
            return res.redirect("/")
        }
    }
)

module.exports = router