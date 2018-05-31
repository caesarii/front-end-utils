
const express = require('express')

const app = express()


app.get('/', function(req, res) {
    res.send('hello world')
})

app.post('/login', function(req, res) {
    res.send('hello world')
})

app.use(function(req, res) {
    console.log('use', req)
    res.send('')
})

app.listen(4000, function() {
    console.log('listening ..')
})