const express = require("express")
const router = express.Router()
const controller = require("../controllers/session.controller")

router.post("/add/:id/:price", controller.addProductToCart)

module.exports = router