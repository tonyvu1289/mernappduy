const express = require('express')
const dotenv = require('dotenv').config()
const {
    errorHandler
} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000 

// create server
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals',require('./routes/goalRoutes'))
app.use(errorHandler)
// start listen
app.listen(port,() => console.log('Server start on port',port))


