const express = require('express')  // express is module which is store in express 
const app = express()
const mogan = require('morgan')
const mongoose = require('mongoose')
const Product= require('./models/product')
const cors = require('cors')


app.use(cors())
app.options('*', cors())





require('dotenv/config')   // access the dotenv file 
const api = process.env.API_URL   // access the data in .env file 



















// Middleware
app.use(express.json())     // express understand the jsong data 
app.use(mogan('tiny'))   // this morgan labraray have provide your api like this POST /api/v1/products/ 200 49 - 3.022 ms











// routers 
const productsRouter = require('./routers/products')
const categoryRouter = require('./routers/categories')
const userRoutes = require('./routers/users')



app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoryRouter)
app.use(`${api}/users`,userRoutes )



























// database
mongoose.connect(process.env.CONECTION_STRING,{
    
})
.then(() => {
    console.log("Database connection is ready...")
})
.catch((err) => {
    console.log(err)
})



app.listen(3000, 
    ()=>{
        console.log(api)
        console.log("server is running ON:  http://localhost:3000")  // this port have run the code 
    }
    
    )  // listen the spesific port 


