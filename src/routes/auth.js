const express=require('express');
const { check } = require('express-validator');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');

const router=express.Router();


router.post('/signup',validateSignupRequest,isRequestValidated,signup);

router.post('/signin',validateSigninRequest,isRequestValidated,signin);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(400).json({ user:'profile'})
// });


module.exports=router;