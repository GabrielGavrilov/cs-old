const express = require("express")
const router = express.Router()
const Shop = require("../models/shop.model")

router.get("/login", (req, res)=> {
    res.render("login.ejs")
})

router.get("/create/shop/:shopName/:shopDescription", (req, res)=> {
    const name = req.params.shopName
    const description = req.params.shopDescription

    const newShop = new Shop({
        shopName: name,
        shopDescription: description
    })

    newShop.save()
    .then(()=> {
        console.log(`[CloverShop]: ${name} has been created`)
    })
    .catch((err)=> {
        console.log(`[CloverShop]: There has been an issue creating the shop`)
        console.log(err)
    })

    res.redirect("/")
})

router.get("/dashboard", (req, res)=> {
    res.render("dashboard.ejs")
})

module.exports = router