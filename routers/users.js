const express = require('express')
const router = express.Router()
const {User} = require('../models/user');
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')




router.post(`/`, async (req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(password, salt),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})


router.get(`/:id`, async(req,res)=>{
    const user = await User.findById(req.params.id)
    // const user = await User.find()

    if(!user){
        res.status(500).json({message:'Ther user with the given id is not match'})
    }
    res.status(200).send(user)
})




router.get(`/`, async(req,res)=>{
    
    const user = await User.find().select('-password')

    if(!user){
        res.status(500).json({message:'Ther user with the given id is not match'})
    }
    res.status(200).send(user)
})



router.post(`/login`, async(req, res)=>{
    const user = await User.findOne({email:req.body.email})
    const secret = process.env.secret
    if(!user){
        return res.status(400).send('The user not found')
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            {
                userId:user.id,
                isAdmin:user.isAdmin
            },
            secret,
            {
                expiresIn:'1d'  // 1 days 
            }
        )
        // res.status(200).send('user Authenticated')
        res.status(200).send({user:user.email, token:token})
    }
    else{
        res.status(400).send('Password is wrong!')
    }
   
})


router.post(`/register`, async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})


router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments()

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})




router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})




module.exports =router;