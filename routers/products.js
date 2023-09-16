const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')
const { Category } = require('../models/category')
const mongoose = require('mongoose')
const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  // cb is call back 
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image Type')

        if (isValid) {
            uploadError = null;
        }
        
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-')
      const extension = FILE_TYPE_MAP[file.mimetype]  //minetype is recognized which type of image are upload in media file
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
  const uploadOption = multer({ storage: storage })






router.get(`/:id`, async (req, res) => {   
    const product = await Product.findById(req.params.id).populate('category')
    if (!product) {
        res.status(500).json({success:false})
    }
    res.send(product)


})


router.get(`/`, async (req, res) => {   
    const product = await Product.find()
    if (!product) {
        res.status(500).json({success:false})
    }
    res.send(product)


})




router.post(`/:id`, uploadOption.single('image'), async (req, res) => { 

    const category = await Category.findById(req.body.category)
    const filename = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`

    if (!category){
        return res.status(400).send('Invalid Category')
    }
    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:`${basePath}${filename}`,     //"http://localhost:3000/public/upload/image-232323"
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


router.post(`/`, uploadOption.single('image'), async (req, res) => { 

    const category = await Category.find()
    const filename = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`

    if (!category){
        return res.status(400).send('Invalid Category')
    }
    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:`${basePath}${filename}`,     //"http://localhost:3000/public/upload/image-232323"
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



router.get(`/get/count`, async (req, res) => {    
    let productCount = await Product.countDocuments()
    if (!productCount) {
        res.status(500).json({success:false})
    }
    res.send({
        productCount:productCount
    })


})



router.get(`/get/featured/:count`, async (req, res) => {    
    const count = req.params.count ? req.params.count : 0
    let products = await Product.find({isFeatured:true}).limit(+count)  // plus use b/c count are string and limit get number (string convert to number using + )
    if (!products) {
        res.status(500).json({success:false})
    }
    res.send({
        products:products
    })


})




// in this paramars are get the value using the category 
router.get(``, async(req,res)=>{

    // localhost:3000/api/v1/products?categories=234532,34211
    let filter = {}
    if(req.query.categories){
        filter = {category:req.query.categories.split(',')}
    }

    const product = await Product.find({category:filter}).populate('category')
    if (!product){
        res.status(500).json({
            message:'The category with the given id is not found'
        })
    }
    res.status(200).send(product)
})

module.exports = router
