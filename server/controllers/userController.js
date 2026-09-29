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

module.exports = router ;