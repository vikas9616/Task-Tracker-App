const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        projectId: req.body.projectId,
    });
    res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.status = req.body.status || task.status;

            if (task.status === 'Completed') {
                task.completedAt = Date.now();
            } else {
                task.completedAt = null;
            }

            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id); // Directly delete the task
        if (task) {
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};
exports.getTasksByStatus = async (req, res) => {
    const tasks = await Task.find({ projectId: req.params.projectId, status: req.params.status });
    res.json(tasks);
};
exports.getTasksByProjectId = async (req, res) => {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
};
exports.getTasksByUserId = async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
};
exports.getTasksByDate = async (req, res) => {
    const tasks = await Task.find({ createdAt: { $gte: req.params.startDate, $lte: req.params.endDate } });
    res.json(tasks);
};