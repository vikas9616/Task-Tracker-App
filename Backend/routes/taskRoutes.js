const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskControllers');

router.route('/:projectId')
    .get(protect, getTasks);

router.route('/')
    .post(protect, createTask);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

module.exports = router;
// This code defines the routes for task management in an Express.js application. It imports the necessary modules, sets up the router, and defines routes for creating, retrieving, updating, and deleting tasks. The protect middleware is used to ensure that only authenticated users can access these routes. Finally, the router is exported for use in other parts of the application.