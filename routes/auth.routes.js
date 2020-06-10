const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;


router.get('/signup', (req, res, next) => res.render('auth/signup'));


module.exports = router;