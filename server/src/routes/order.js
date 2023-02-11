const router = require('express').Router();
const Order = require('../models/Order');
const { body, validationResult } = require('express-validator');