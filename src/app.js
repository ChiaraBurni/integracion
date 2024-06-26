const express = require("express")
const exphbs = require("express-handlebars")
const io = require("./sockets.js")
const { router: productsRouter } = require("./routes/products.router.js")
const { router: cartsRouter } = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
require("./database.js")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))

app.engine("handlebars", exphbs.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}))
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("./routes/products.router.js", productsRouter)
app.use("./routes/carts.router.js", cartsRouter)
app.use("./routes/views.router.js", viewsRouter)

const httpServer = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

io(httpServer)