var express = require('express');
var router  = express.Router();

// Getting To Home Page
router.get('/',(req,res) => {
   res.status(201).render('index');
} );







module.exports = router;