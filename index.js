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
    // 
    res.render('products/index')
})


var server = app.listen(process.env.PORT || 3000, () => {
    rowdyResults.print()
  })

module.exports = server