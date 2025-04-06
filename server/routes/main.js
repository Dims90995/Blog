const express = require('express');
const router = express.Router();


// Routes
router.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        layout: './layouts/main',
    });
  });


  module.exports = router;