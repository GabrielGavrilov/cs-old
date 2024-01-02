const express = require("express")
const router = express.Router()
const Category = require("../models/category.model")
const Product = require("../models/product.model")

/**
 * GET routes
 */
router.get("/", async function (req, res) {
    const categories = await Category.find({})
    
    return res.render("Homepage.ejs", {
        categories: categories
    })
})

router.get("/cart", async function (req, res) {
    const categories = await Category.find({})
    const currentCartItems = req.session.cart
    let items = []
    let cartSubtotal = 0

    if(currentCartItems) {
        for(let i = 0; i < currentCartItems.length; i++) {
            const product = await Product.findOne({"_id": currentCartItems[i].id})
            const quantity = currentCartItems[i].quantity
            
            const shoppingCartItem = {
                product: product,
                quantity: quantity
            }
    
            cartSubtotal += (product.price * quantity)
            items.push(shoppingCartItem)
        }
    }

    return res.render("Cart.ejs", {
        categories: categories,
        items: items,
        cartSubtotal: cartSubtotal
    })
})

module.exports = router