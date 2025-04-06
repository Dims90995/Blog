const express = require('express');
const router = express.Router();


// Routes
router.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        layout: './layouts/main',
    }); 
  });

  router.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        layout: './layouts/main',
    }); 
  });


  module.exports = router;