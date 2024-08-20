const express = require('express');
const router = express.Router();
const { createTask , updateTask, getTasks , deleteTask } = require('../controller/task.controller');

router.post('/create',createTask);
router.put('/put/:id', updateTask);
router.get('/get', getTasks);
router.delete('/delete/:id', deleteTask)

module.exports = router;