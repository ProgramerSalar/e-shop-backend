const express = require('express')  // express is module which is store in express 
const app = express()


require('dotenv/config')   // access the dotenv file 
const api = process.env.API_URL   // access the data in .env file 


// Middleware
app.use(express.json())     // express understand the jsong data 






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


app.listen(3000, 
    ()=>{
        console.log(api)
        console.log("server is runnint  http://localhost:3000")  // this port have run the code 
    }
    
    )  // listen the spesific port 