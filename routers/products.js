const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')
const { Category } = require('../models/category')




// http://localhost:3000/api/v1/products
router.get(`/:id`, async (req, res) => {     // slash is the parameter run the intital, take to request and response command 
    const product = await Product.findById(req.params.id).populate('category')
    if (!product) {
        res.status(500).json({success:false})
    }
    res.send(product)


})



// router.get(`/`, async (req, res) => {     // slash is the parameter run the intital, take to request and response command 
//     const product = await Product.find().select('name image')
//     if (!product) {
//         res.status(500).json({success:false})
//     }
//     res.send(product)


// })


router.post(`/`, async (req, res) => { 

    const category = await Category.findById(req.body.category)
    if (!category){
        return res.status(400).send('Invalid Category')
    }


    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        numReview:req.body.numReview,
        isFeatured:req.body.isFeatured,

        
    })


    product = await product.save();


    if(!product){
        return res.status(500).send('The Product cannot be created')
    }
    res.send(product)

    
})



module.exports = router
