var express = require('express');
var router  = require.Router();

// Getting register Route
router.get('/register',(req,res) => {
   res.status(201).render('register');
} );

// Getting Login Route
router.get('/login',(req,res) => {
   res.status(201).render('login');
} );







module.exports = router;