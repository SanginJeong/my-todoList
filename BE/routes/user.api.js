const express = require('express');
const router = express.Router()
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

router.post('/', userController.register);
router.post('/login', userController.login);
router.get('/', authController.authenticate, userController.getUser);
module.exports = router;