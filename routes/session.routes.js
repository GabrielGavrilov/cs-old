const express = require("express")
const router = express.Router()
const controller = require("../controllers/session.controller")

/**
 * GET routes
 */
router.get("/reset", controller.resetCart)

/**
 * POST routes
 */
router.post("/add/:id/:price", controller.addProductToCart)

module.exports = router