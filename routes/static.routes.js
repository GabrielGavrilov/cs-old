const express = require("express")
const router = express.Router()
const Category = require("../models/category.model")

router.get("/", 
    async function (req, res) {
        const categories = await Category.find({})
    
        return res.render("home.ejs", {
            categories: categories
        })
    }
)

router.get("/category/:categoryName", 
    async function(req, res)
    {
        const name = req.params.categoryName
        const category = await Category.findOne({"name": name})
        const categories = await Category.find({})

        return res.render("category.ejs", {
            category: category,
            categories: categories
        })
    }
)

module.exports = router