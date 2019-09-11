var express = require('express');
var router  = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var { ensureAuthenticated } = require('../helpers/auth');


require('../model/user');
var User = mongoose.model('users');

// Passport Config model Loaded
require('../config/passport')(passport);

// Getting register Route
router.get('/register',(req,res) => {
   res.status(201).render('register');
} );

// Getting Login Route
router.get('/login',(req,res) => {
   res.status(201).render('login');
} );



//Register User // to the database   Post request and validation
router.post('/register',(req, res) => {
   let errors = []
   if (req.body.name === "") {
      errors.push({ text: 'Please provide your Name!'});
    }
    if (req.body.userName === "") {
      errors.push({ text: 'Please provide your User Name!'});
    }

   if (req.body.password != req.body.password2) {
     errors.push({ text: 'Password do not Match Buddy !!' })
   }
 
   if (req.body.password.length < 4) {
     errors.push({ text: 'Password must be atleast 4 characters' })
   }
   if (errors.length > 0) {
     res.render('register', {
       errors: errors,
       name: req.body.name,
       email: req.body.email,
       userName: req.body.userName,
       password: req.body.password,
       password2: req.body.password2
 
     });
   } else {
     User.findOne({ email: req.body.email })
     .then(user => {
       if (user) {
         req.flash('error_msg', 'Email already regsitered');
         res.redirect('./register');
       } else {
         const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            password2: req.body.password2
         });
 
         bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
             if (err) throw err;
             newUser.password = hash;
             newUser.save()
             .then(user => {
               req.flash('success_msg', 'You are now registered and can log in');
               res.redirect('/login');
             })
             .catch(err => {
               console.log(err);
               return;
             });
           });
         });
 
       }
     });
 
   }
 });

//  Login Users

// / Login Form Post
router.post('/login',(req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: './login',
    failureFlash: true
  })(req, res, next);
});

///logout User
router.get('/logout',(req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are Logged Out of the system')
  res.redirect('/')
})








module.exports = router;