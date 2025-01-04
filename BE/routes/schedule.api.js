const express = require('express');
const router = express.Router();
const scheduleController = require('../controller/schedule.controller');

router.post('/', scheduleController.appendSchedule);
router.get('/', scheduleController.getSchedule);
router.put('/', scheduleController.updateSchedule);
router.delete('/', scheduleController.deleteSchedule);

module.exports = router;