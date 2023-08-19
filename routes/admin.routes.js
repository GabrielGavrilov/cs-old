/**
 * Administrator routes
 */

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const Category = require("../models/category.model")
const Product = require("../models/product.model")
const Subcategory = require("../models/subcategory.model")
const multer = require('multer')
const fs = require("fs")
const path = require("path")

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>
    {
        cb(null, "./public/images/")
    },
    filename: (req, file, cb)=> 
    {
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
router.get("/subcategories", function(req, res) { res.render("admin/subcategories.ejs") })
router.get("/categories/new", function(req, res) { res.render("admin/categories_new.ejs") })

router.get("/products/new", 
    async function(req, res) 
    {
        const categories = await Category.find({})

        return res.render("admin/products_new.ejs", 
        {
            categories: categories
        })
    }
)

router.get("/subcategories/new", 
    async function(req, res)
    {
        const categories = await Category.find({})

        return res.render("admin/subcategories_new.ejs",
        {
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
        const category = await Category.findOne({'name': req.body.categoryName})

        if(!category)
        {
            const newCategory = new Category({
                name: req.body.categoryName,
                description: req.body.categoryDescription
            })

            await newCategory.save()
            .then(()=>
            {
                console.log(`${categoryName} has been created.`)
                return res.redirect("/admin/categories")
            })
            .catch((err)=>
            {
                console.log(err)
                return res.redirect("/admin/categories/new")
            })
        }
        else
        {
            // TODO: Flash "Category already exists."
            return res.redirect("/admin/categories")
        }
    }
)

router.post("/subcategories/new", 
    async function(req, res)
    {
        const subcategoryName = req.body.subcategoryName
        const categoryName = req.body.categoryName

        const subcategoryExists = await Subcategory.findOne({"name": subcategoryName, "categoryName": categoryName})

        if(!subcategoryExists)
        {
            const newSubcategory = new Subcategory({
                name: subcategoryName,
                categoryName: categoryName
            })
    
            newSubcategory.save()
            .then(()=> 
            {
                console.log("New subcategory has been created.")
                return res.redirect("/admin/subcategories")
            })
            .catch((err)=>
            {
                console.log(err)
                return res.redirect("/admin/subcategories")
            })
        }
        else
        {
            // TODO: Flash "Subcategory already exists"
            return res.redirect("/admin/subcategories")
        }

    }
)

router.post("/products/new", fileUpload.single("productPicture"),
    async function(req, res)
    {
        const categoryName = req.body.categoryName
        const subcategoryName = req.body.productSubcategory
        const subcategoryExists = await Subcategory.findOne({"name": subcategoryName})

        if(!subcategoryExists)
        {
            const newSubcategory = new Subcategory({
                name: subcategoryName,
                categoryName: categoryName
            })
            
            newSubcategory.save()
            .then(()=>
            {
                console.log(`[CloverShop]: Subcategory ${subcategoryName} has been created`)
            })
            .catch((err)=> 
            {
                console.log(err)
            })
        }

        const newProduct = new Product({
            picture: req.file.filename,
            name: req.body.productName,
            description: req.body.productDescription,
            price: req.body.productPrice,
            quantity: req.body.productQuantity,
            categoryName: categoryName,
            subcategoryName: subcategoryName
        })

        newProduct.save()
        .then(()=> 
        {
            console.log(`[CloverShop]: Product "${req.body.productName}" has been created`)
            return res.redirect("/admin/products")
        })
        .catch((err)=> 
        {
            console.log(err)
            return res.redirect("/admin/products/new")
        })
    }
)

module.exports = router