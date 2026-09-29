const router =  require('express').Router();
const User = require('./../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

//it create  a endpoints in this file that controllers the authorization and authentication like signup and logedIn
router.post('/signup',async (req,res)=>{
     try{
        //if the user already exits
        const user  = await User.findOne({email:req.body.email})

        //if user exits send the error message
        if (user){
            return res.send({
            message:'user Already exist',
            success:false
            })
        }

        //encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;

        //create new user, save in DB
        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            message : 'User Successfully created',
            success : true
        });

        

     }catch(error){
        res.send({
            message : error.message,
            success:false
        })

     }
})

router.post('/login',async(req,res) =>{
    try{
        //1. check if user exits
        const user  = await User.findOne({email : req.body.email});
        if(!user){
            return  res.send({
                message : 'User does not exist',
                success:false
            })
        }


        //2.check if the password is correct
        const isvalid  = await bcrypt.compare(req.body.password,user.password);
        if(!isvalid){
            return res.send({
                message : 'Password doesnt match!',
                success : false
            })
        }

        //3. if user exits and correct password assign a JWT
        const token = jwt.sign({userId: user._id},process.env.SECRET_KEY,{expiresIn:"1d"})

        res.send({
            message :'user loged-in success!',
            success:true,
            token : token
        })

    }
    catch(err){
        res.send({
            message:err.message,
            success : false
        })
    }
})

module.exports = router;
