const express = require('express');
const router = express.Router();


// rooutes
router.get('', (req, res) => {
    res.send('Hello World!');
  });


  module.exports = router;