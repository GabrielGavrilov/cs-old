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
router.post("/:categoryName/subcategory/", controller.subcategoryPageHandler)
router.get("/:categoryName/product/:productId", controller.productPageHandler)

module.exports = router