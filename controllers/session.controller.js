const session = require("express-session")
const Product = require("../models/product.model")

async function addProductToCart(req, res) {
    const product = await Product.findOne({"_id": req.params.id})

    if(product) {
        const item = {
            id: req.params.id,
            quantity: req.body.quantity,
            price: req.params.price
        }

        if(!req.session.cart) {
            req.session.cart = []

            let updatedCart = []
            updatedCart = req.session.cart
            updatedCart.push(item)
            req.session.cart = updatedCart

            return res.redirect("/")
        }
        
        else {
            let updatedCart = []
            updatedCart = req.session.cart
            updatedCart.push(item)
            req.session.cart = updatedCart

            return res.redirect("/")
        }
    }
    
    else {
        return res.redirect("/")
    }
}

module.exports = {
    addProductToCart
}