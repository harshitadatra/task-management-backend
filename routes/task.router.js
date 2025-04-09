const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controller/task.controller');
const { authenticateToken } = require('../middleware/verifyAuth');

const router = express.Router();

router.use(authenticateToken);

// Task routes (all now protected)
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
