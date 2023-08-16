const express = require("express")
const router = express.Router()
const Shop = require("../models/shop.model")

router.get("/", async (req, res)=> {
    const shops = await Shop.find({})
    // console.log(shops.length)
    // for(let i = 0; i < shops.length; i++) {
    //     console.log(shops[i].shopName)
    // }

    res.render("home.ejs", {
        shops: shops
    })
})

router.get("/shop", (req, res)=> {
    res.render("shop.ejs")
})

module.exports = router