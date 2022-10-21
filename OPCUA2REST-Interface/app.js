const express = require("express");
const app = express();

require('dotenv').config()

const browseRoutes = require("./routes/routes")

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*")
    next();

})

app.use((error, req, res, next) => {

    const status = error.statusCode || 500
    const message = error.message;
    console.log(error)
    res.status(status).json({ message: message, })

})

app.use(browseRoutes)


app.listen(4840)