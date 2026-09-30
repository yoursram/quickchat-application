const router = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const User = require('../models/user');

router.get('/get-logged-user',authMiddleware,async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.userId});

        res.send({
            message:'user fetched Succesfully',
            success:true,
            data:user
        })

    }catch(err){
        res.send({
            message:err.message,
            success:false
        })

    }
})


router.get('/get-all-user',authMiddleware,async(req,res)=>{
    try{
        const userid = req.userId;
        const alluser = await User.find({_id:{$ne:userid}});

        res.send({
            message:'All user fetched Succesfully',
            success:true,
            data:alluser
        })

    }catch(err){
        res.status(400).send({
            message:err.message,
            success:false
        })

    }
})



module.exports = router ;