const express = require("express")
const router = express.Router()
const Category = require("../models/category.model")
const Product = require("../models/product.model")
const Subcategory = require("../models/subcategory.model")

async function categoryPageHandler(req, res) {
    const name = req.params.categoryName
    const categories = await Category.find({})
    const category = await Category.findOne({"name": name})
    const subcategories = await Subcategory.find({'categoryName': name})
    const products = await Product.find({"categoryName": name})

    if(category) {
        return res.render("Category.ejs", {
            categories: categories,
            category: category,
            subcategories: subcategories,
            products: products
        })
    }
        
    else {
        return res.redirect("/")
    } 
}

async function subcategoryPageHandler(req, res) {
    const name = req.params.categoryName
    const categories = await Category.find({})
    const category = await Category.findOne({"name": name})
    const subcategories = await Subcategory.find({'categoryName': name})
    const products = await Product.find({"categoryName": name, "subcategoryName": req.body.subcategoryName})

    if(category) {
        return res.render("Category.ejs", {
            categories: categories,
            category: category,
            subcategories: subcategories,
            products: products
        })
    }

    else {
        return res.redirect("/")
    }
}

async function productPageHandler(req, res) {
    const product = await Product.findOne({"_id": req.params.productId, "categoryName": req.params.categoryName})
    const categories = await Category.find({})

    if(product) {
        return res.render("Product.ejs", {
            categories: categories,
            product: product
        })
    }
        
    else {
        console.log(`Cannot find: ${req.params.id} in ${req.params.categoryName}`)
        return res.redirect("/")
    }
}

module.exports = {
    categoryPageHandler,
    subcategoryPageHandler,
    productPageHandler
}