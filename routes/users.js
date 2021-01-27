const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//user model
const User = require('../models/User');

//Login 
router.get('/login', (req, res) => res.render('login'));

//Register
router.get('/register', (req, res) => res.render('register'));


//Register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password || !password2)
    {
        errors.push({ msg: 'Please fill all the fields' });
    }

    //check passwords match
    if(password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //check pass length`
    if(password.length < 6)
    {
        errors.push({ msg: 'Password must be greater than 6 characters' })
    }
    
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        
        //VALIDATION PASSED
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                //user exists
                errors.push({ msg: "email is already registered" });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
            });
        }
        else    {
                    const newUser = new User(req.body).save();
                    if(newUser) return res.status(200).json({newUser});
                }
            });
        
    }

});

module.exports = router;