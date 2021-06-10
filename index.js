// import axios - node package allows basic get request
const axios = require('axios')
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
// let db = require('./models')
let moment = require('moment')
let rowdy = require('rowdy-logger')
let app = express()

var rowdyResults = rowdy.begin(app)

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))

// GET --> home & intro screen for Vamp
app.get('/', (req,res) => {
    res.render('main/index')
})

// GET --> show search categories in products page
app.get('/products', (req,res) => {
    res.render('products/index')
})

// GET --> returns data from makeup api based on query
app.get('/products/search', (req,res) => {
    const type = req.query.product_type
    const brand = req.query.brand
    // const brand = req.query.brand
    // search makeup api database
    axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}&brand=${brand}`)
        .then((response) => {
            // render data to page
            res.render('products/results', { product: response.data})
        })
        .catch(err => {console.log(err)})
})

// GET --> return product id
app.get('/product/:id', (req,res) => {

    // search api data for id
    axios.get(`http://makeup-api.herokuapp.com/api/v1/products/${req.params.id}.json`)
    .then((response) => {
        console.log(response)
        // render product details to page
        res.render('products/detail', {product: response.data})
    })
    .catch(err => {console.log(err)})
})


var server = app.listen(process.env.PORT || 3000, () => {
    rowdyResults.print()
  })

module.exports = server