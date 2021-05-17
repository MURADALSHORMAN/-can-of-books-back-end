// require packages

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// initialize our server

const app = express();
const port = process.env.PORT || 3839;
app.use(cors());
