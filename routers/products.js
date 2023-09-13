const express = require('express')
const router = express.Router()
const Product = require('../models/product')




// http://localhost:3000/api/v1/products
router.get(`/`, async (req, res) => {     // slash is the parameter run the intital, take to request and response command 
    // const product = {
    //     id:1,
    //     name:'hair dresser',
    //     image:'some_url'
    // }
    const productList = await Product.find()
    if (!productList) {
        res.status(500).json({success:false})
    }
    res.send(productList)


})


router.post(`/count`, (req, res) => {     // slash is the parameter run the intital, take to request and response command 
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    })

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error:err,
            success:false
        })
    })
    


})



module.exports = router
