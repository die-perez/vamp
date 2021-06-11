// import axios - node package allows basic get request
const axios = require('axios')
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let moment = require('moment')
let rowdy = require('rowdy-logger')
const { response } = require('express')
let app = express()

var rowdyResults = rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))

// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
    res.locals.moment = moment
    next()
  })

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
            res.render('products/results', { product: response.data })
        })
        .catch(err => {console.log(err)})
})

// GET --> return product details
app.get('/product/:id', (req,res) => {
    // search api data for id
    axios.get(`http://makeup-api.herokuapp.com/api/v1/products/${req.params.id}.json`)
    .then((response) => {
        db.review.findAll({
            where: {productId: req.params.id},
            include: [db.user]
        })
        .then((reviews) => {
            // render product details and comments to page
            res.render('products/detail', { product: response.data, reviews })
        })
        .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)})
})

// POST --> post comments on product page
app.post('/product/:id/review', (req,res) => {
    let name = req.body.name
    let email = req.body.email
    let content = req.body.content
    let productId = req.params.id

    //get form data and add a new record to userDB
    db.user.findOrCreate({
      where: {
        email: email
      },
      defaults: {
          name: name
      }
    })
    //grab other data and store in review DB
    .then(([user, created]) => {
        db.review.findOrCreate({
            where: {
                userId: user.id,
                productId: productId
            },
            defaults: {
                content: content
            }
        }).then(([review, created]) => {
            res.redirect(`/product/${productId}`)
        })
        .catch(err => {console.log(err)}) 
    })
    .catch(err => {console.log(err)}) 
})

// GET --> user info
app.get('/users/:id', (req,res) => {
    // find all reviews by specific user
    db.user.findOne({
        where: {id: req.params.id},
        include: [db.review]
    })
    .then((user) => {
        console.log(user)
        // render all reviews by this user to page
        res.render('users/show', { user: user })
    })
    .catch(err => {console.log(err)})
})

var server = app.listen(process.env.PORT || 3000, () => {
    rowdyResults.print()
  })

module.exports = server