require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const upload = require('express-fileupload')
const port = process.env.PORT
const router = require("./router/route")
const cors = require('cors')
require("./connection/conn")


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(upload())

app.use(cors())
app.options('*', cors())

app.use(router)

app.use(express.static('../client/build'))
app.get("*", (req, res) => {
    res.sendFile(path.resolve('../client/build', 'index.html'))
})

app.listen(port, () => {
    console.log(`server on port : ${process.env.PORT}`);
})




