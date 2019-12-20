//nodemon

const express = require('express');
const app = express();

require('./config/express')(app);
require('./config/routes')(app);

module.exports = app;
