const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')
const { Category } = require('../models/category')
const mongoose = require('mongoose')



// http://localhost:3000/api/v1/products
router.get(`/:id`, async (req, res) => {     // slash is the parameter run the intital, take to request and response command 
    const product = await Product.findById(req.params.id).populate('category')
    if (!product) {
        res.status(500).json({success:false})
    }
    res.send(product)


})




router.post(`/:id`, async (req, res) => { 

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




router.put('/:id', async (req,res)=>{

    if(mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product Id')
    }

    const category = await Category.findById(req.body.category)
    if (!category){
        return res.status(400).send('Invalid Category')
    }



    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
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

        },{
            new:true
        }
    )
    if(!product){
        return res.status(500).send('the product cannot be !')

    }
    
    res.send(product)
})




router.delete('/:id', (req,res)=>{
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if (product){
            return res.status(200).json({success:true, message:'the category is deleted'})
        }
        else{
            return res.status(404).json({success:false, message:"category not found"})
        }
    }).catch((err)=>{
        return res.status(400).json({success:false, error:err})
    })




})



module.exports = router
