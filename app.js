const express = require('express')  // express is module which is store in express 
const app = express()
const mogan = require('morgan')
const mongoose = require('mongoose')






require('dotenv/config')   // access the dotenv file 
const api = process.env.API_URL   // access the data in .env file 


// Middleware
app.use(express.json())     // express understand the jsong data 
app.use(mogan('tiny'))   // this morgan labraray have provide your api like this POST /api/v1/products/ 200 49 - 3.022 ms





// http://localhost:3000/api/v1/products
app.get(`${api}/products/`, (req, res) => {     // slash is the parameter run the intital, take to request and response command 
    const product = {
        id:1,
        name:'hair dresser',
        image:'some_url'
    }
    res.send(product)


})


app.post(`${api}/products/`, (req, res) => {     // slash is the parameter run the intital, take to request and response command 
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)


})


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
        console.log("server is runnint  http://localhost:3000")  // this port have run the code 
    }
    
    )  // listen the spesific port 