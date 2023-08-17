/**
 * Administrator routes
 */

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const Category = require("../models/category.model")

/**
 * GET ROUTES
 */

router.get("/login", function(req, res) { res.render("admin/login.ejs") })
router.get("/dashboard", function(req, res) { res.render("admin/dashboard.ejs") })
router.get("/categories", function(req, res) { res.render("admin/categories.ejs") })
router.get("/products", function(req, res) { res.render("admin/products.ejs") })
router.get("/categories/new", function(req, res) { res.render("admin/categories_new.ejs") })
router.get("/products/new", function(req, res) { res.render("admin/products_new.ejs")})

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
            res.redirect("/admin/categories/new")
        })
        .catch((err)=>
        {
            console.log(err)
            res.redirect("/admin/categories/new")
        })
    }
})

module.exports = router