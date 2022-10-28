const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const { json } = require("body-parser");
const db = require('./backend/db');
const { Router } = require("express");
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routes = require('./backend/routes')
app.use(routes);

app.listen(3070, () => {
  console.log("server connected");
});