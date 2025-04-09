const Task = require('../models/task.model')

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });
    console.log("reques user",req.user)

    const task = new Task({
      user: req.user.userId,
      title,
      description,
      status: status || 'pending',
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Update task by ID
const updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Delete task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
module.exports = {createTask,updateTask,deleteTask,getTasks}
