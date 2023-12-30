const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const Category = require("../models/category.model")
const Product = require("../models/product.model")
const Subcategory = require("../models/subcategory.model")
const multer = require('multer')
const fs = require("fs")
const path = require("path")
const controller = require("../controllers/admin.controller")

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>
    {
        cb(null, "./public/uploads/")
    },
    filename: (req, file, cb)=> 
    {
        cb(null, Date.now() + " - " + file.originalname)
    }
})

const fileUpload = multer({storage: fileStorage})

/**
 * GET routes
 */
router.get("/login", controller.loginPageHandler)
router.get("/dashboard", controller.dashboardPageHandler)
router.get("/categories", controller.categoriesPageHandler)
router.get("/products", controller.productPageHandler)
router.get("/subcategories", controller.subcategoriesPageHandler)
router.get("/categories/new", controller.newCategoryPageHandler)
router.get("/products/new", controller.newProductPageHandler)
router.get("/subcategories/new", controller.newSubcategoryPageHandler)

/**
 * POST routes
 */
router.post("/categories/new", controller.newCategoryHandler)
router.post("/subcategories/new", controller.newSubcategoryHandler)
router.post("/products/new", fileUpload.single("productPicture"), controller.newProductHandler)

module.exports = router