const express = require('express')
const router = express.Router()
const {Category} = require('../models/category')


router.get('/', async (req, res) => {
    const categoryList = await Category.find()

    if (!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList)

})


router.post('/', async (req, res)=> {
    let category = new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    })
    category = await category.save()

    if(!category){
        return res.status(400).send('the category cannot be created!')

    }
    
    res.send(category)

    
})

// api/vi/id(like this= 22223232323)
router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        if (category){
            return res.status(200).json({success:true, message:'the category is deleted'})
        }
        else{
            return res.status(404).json({success:false, message:"category not found"})
        }
    }).catch((err)=>{
        return res.status(400).json({success:false, error:err})
    })




})



router.put('/:id', async (req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color

        },{
            new:true
        }
    )
    if(!category){
        return res.status(400).send('the category cannot be updated!')

    }
    
    res.send(category)
})

// get the the category detail
// router.get('/', async(req,res)=>{
//     const category = await Category.findById(req.params.id)
//     if (!category){
//         res.status(500).json({
//             message:'The category with the given id is not found'
//         })
//     }
//     res.status(200).send(category)
// })



module.exports = router


