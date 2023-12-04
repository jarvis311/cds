const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/gps_map_camara")
    .then(() => { console.log('connation sucessfull..') })
    .catch((err) => { console.log(err) })