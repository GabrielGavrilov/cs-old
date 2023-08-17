/**
 * Administrator routes
 */

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const Category = require("../models/category.model")
const Product = require("../models/product.model")
const multer = require('multer')
const fs = require("fs")
const path = require("path")

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "./public/images/")
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + " - " + file.originalname)
    }
})

const fileUpload = multer({storage: fileStorage})

/**
 * GET ROUTES
 */

router.get("/login", function(req, res) { res.render("admin/login.ejs") })
router.get("/dashboard", function(req, res) { res.render("admin/dashboard.ejs") })
router.get("/categories", function(req, res) { res.render("admin/categories.ejs") })
router.get("/products", function(req, res) { res.render("admin/products.ejs") })
router.get("/categories/new", function(req, res) { res.render("admin/categories_new.ejs") })

router.get("/products/new", 
    async function(req, res) 
    {
        const categories = await Category.find({})

        return res.render("admin/products_new.ejs", {
            categories: categories
        })
    }
)

/**
 * POST ROUTES
 */

router.post("/categories/new", 
    async function(req, res) 
    {
        const categoryName = req.body.categoryName
        const categoryDescription = req.body.categoryDescription
        const category = await Category.findOne({'name': categoryName})

        if(category)
        {
            console.log("Category name taken!")
            res.redirect("/admin/categories/new")
        }

        else
        {
            const newCategory = new Category({
                name: categoryName,
                description: categoryDescription
            })

            await newCategory.save()
            .then(()=>
            {
                console.log(`${categoryName} has been created.`)
                res.redirect("/admin/categories")
            })
            .catch((err)=>
            {
                console.log(err)
                res.redirect("/admin/categories/new")
            })
        }
    }
)

router.post("/products/new", fileUpload.single("productPicture"),
    async function(req, res)
    {
        const productPicture = req.file.filename
        const productName = req.body.productName
        const productDescription = req.body.productDescription
        const productPrice = req.body.productPrice
        const categoryName = req.body.categoryName

        const newProduct = new Product({
            picture: productPicture,
            name: productName,
            description: productDescription,
            price: productPrice,
            categoryName: categoryName
        })

        newProduct.save()
        .then(()=> 
        {
            console.log(`${productName} has been created.`)
            res.redirect("/admin/products")
        })
        .catch((err)=> 
        {
            console.log(err)
            res.redirect("/admin/products/new")
        })
    }
)

module.exports = router