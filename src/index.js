const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use( express.json() )
app.use(authRoutes)

const mongoUri = "mongodb+srv://admin:0000@cluster0.4yxru.mongodb.net/trackapp"
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance')
})
mongoose.connection.on('error', (error) => {
    console.log('Error connecting to mongo', error)
})
app.get('/', (req, res) => {
    res.send('hi there')
})
const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => {
    console.log('Listening port', port)
})