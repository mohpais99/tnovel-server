const express = require('express');
const router = express.Router();
const {verifyToken} = require('../helpers/Global')

const controller = require('../controllers/auth-controller');

router.get('/list-guest', verifyToken, controller.findAll);
router.post('/do-login', controller.loginAccount);
router.post('/register', controller.createAccount)

module.exports = router;
