const express = require('express')  // express is module which is store in express 
const app = express()


require('dotenv/config')   // access the dotenv file 
const api = process.env.API_URL   // access the data in .env file 



// http://localhost:3000/api/v1/products
app.get(api+'/products', (req, res) => {     // slash is the parameter run the intital, take to request and response command 
    res.send("hello Api !")
})


app.listen(3000, 
    ()=>{
        console.log(api)
        console.log("server is runnint  http://localhost:3000")  // this port have run the code 
    }
    
    )  // listen the spesific port 