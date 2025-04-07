"use strict";

require('dotenv').config();

var express = require('express');

var expressLayouts = require('express-ejs-layouts');

var connectDB = require('./server/config/db');

var app = express();
var PORT = 5000 || process.env.PORT;
app.use(express["static"]('public'));
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use('/', require('./server/routes/main'));
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});