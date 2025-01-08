const express = require('express');
const router = express.Router();
const scheduleController = require('../controller/schedule.controller');
const authController = require('../controller/auth.controller');

router.post('/', authController.authenticate ,scheduleController.appendSchedule);
router.get('/', authController.authenticate ,scheduleController.getSchedule);
router.get('/group', authController.authenticate ,scheduleController.getGroupedByMonthSchedule);
router.patch('/:id', authController.authenticate ,scheduleController.updateSchedule);
router.patch('/isDone/:id', authController.authenticate, scheduleController.updateScheduleIsDone);
router.delete('/:id', authController.authenticate, scheduleController.deleteSchedule);
module.exports = router;