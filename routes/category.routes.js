const express = require("express")
const router = express.Router()
const Category = require("../models/category.model")
const Product = require("../models/product.model")
const Subcategory = require("../models/subcategory.model")
const controller = require("../controllers/category.controller")

/**
 * GET routes
 */
router.get("/:categoryName", controller.categoryPageHandler)
router.get("/:categoryName/product/:productId", controller.productPageHandler)

/**
 * POST routes
 */
router.post("/:categoryName/subcategory/", controller.subcategoryPageHandler)

module.exports = router