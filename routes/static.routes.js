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

module.exports = router