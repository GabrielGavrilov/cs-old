const express = require("express")
const router = express.Router()
const Category = require("../models/category.model")

router.get("/", async function (req, res) {
    const categories = await Category.find({})
    
    return res.render("home.ejs", {
        categories: categories
    })
})

router.get("/cart", async function (req, res) {
    const categories = await Category.find({})

    const currentCart = req.session.cart

    for(let i = 0; i < currentCart.length; i++) {
        console.log(currentCart[i])
    }

    return res.render("cart.ejs", {
        categories: categories
    })
})

module.exports = router