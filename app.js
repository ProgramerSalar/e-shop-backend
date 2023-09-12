const express = require('express')  // express is module which is store in express 
const app = express()


app.get('/', (req, res) => {
    res.send("hello Api !")
})


app.listen(3000, 
    ()=>{
        console.log("server is runnint  http://localhost:3000")  // this port have run the code 
    }
    
    )  // listen the spesific port 