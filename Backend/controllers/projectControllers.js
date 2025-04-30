const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const projects = await Project.find({ userId: req.user._id });
    if (projects.length >= 4) {
        return res.status(400).json({ message: 'Project limit (4) reached' });
    }
    const project = await Project.create({ name: req.body.name, userId: req.user._id });
    res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
};
exports.getProjectById = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    if (project.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to access this project' });
    }
    res.json(project);
};
exports.updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    if (project.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to access this project' });
    }
    project.name = req.body.name || project.name;
    await project.save();
    res.json(project);
};
exports.deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    if (project.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to access this project' });
    }
    await project.remove();
    res.json({ message: 'Project removed' });
};
exports.getProjectByName = async (req, res) => {
    const project = await Project.findOne({ name: req.params.name, userId: req.user._id });
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
};