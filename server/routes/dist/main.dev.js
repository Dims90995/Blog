"use strict";

var express = require('express');

var router = express.Router(); // Routes

router.get('', function (req, res) {
  var locals = {
    title: 'Blog',
    description: 'simple Blog'
  };
  res.render('index', {
    locals: locals
  });
});
router.get('/about', function (req, res) {
  res.render('about');
});
router.get('/contact', function (req, res) {
  res.render('contact');
});
module.exports = router;