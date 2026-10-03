const authMiddleware = require('../middlewares/authMiddleware');
const chat = require('./../models/chat');

const router = require('express').Router();

router.post('/create-chat',authMiddleware,async(req,res)=>{
    try{
        const Chat = chat(req.body);
        const savedchat = await Chat.save();
        res.status(201).send({
            message :'Chat created Successfully',
            success:true,
            data:savedchat
        })
    }catch(err){
        res.status(400).send({
            message : err.message,
            success: false
        })
    }
})

module.exports = router;