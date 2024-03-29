const settings = require("./clovershop.json")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const mongoStore = require("connect-mongo")
const session = require("express-session")
const flash = require("connect-flash")
const app = express()

const staticRoutes = require("./routes/static.routes")
const userRoutes = require("./routes/admin.routes")
const categoryRoutes = require("./routes/category.routes")
const sessionRoutes = require("./routes/session.routes")

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

const sessionStore = new mongoStore({
    mongoUrl: settings.DATABASE_URI,
    collectionName: 'sessions'
})

/**
 * ExpressJS settings
 */

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"))
app.use(flash())

app.use(session({
    secret: settings.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

/**
 * Routes
 */

app.use("/", staticRoutes)
app.use("/category", categoryRoutes)
app.use("/session", sessionRoutes)
app.use("/admin", userRoutes)

/**
 * Server listener
 */

app.listen(settings.PORT, "localhost", ()=> {
    console.log(`[CloverShop]: Listening on port ${settings.PORT}`)
})