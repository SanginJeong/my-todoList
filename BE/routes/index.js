const express = require("express");
const router = express.Router();
const userApi = require('./user.api');
const scheduleApi = require('./schedule.api');

router.use('/user', userApi);
router.use('/schedule', scheduleApi);
module.exports = router;

