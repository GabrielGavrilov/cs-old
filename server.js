const settings = require("./clovershop.json")
const express = require("express")
const mongoose = require("mongoose")
const app = express()

const staticRoutes = require("./routes/static.routes")
const userRoutes = require("./routes/admin.routes")
const bodyParser = require("body-parser")

/**
 * MongoDB Connection
 */

mongoose.set('strictQuery', false)
mongoose.connect(settings.DATABASE_URI)
.then(()=> {
    console.log("[CloverShop]: Successfully connected to MongoDB")
})
.catch((err)=> {
    console.log("[CloverShop]: Unable to connect to MongoDB")
    console.log(err)
});

/**
 * ExpressJS settings
 */

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"))

/**
 * Routes
 */

app.use("/", staticRoutes)
app.use("/admin", userRoutes)

/**
 * Server listener
 */

app.listen(settings.PORT, "localhost", ()=> {
    console.log(`[CloverShop]: Listening on port ${settings.PORT}`)
})