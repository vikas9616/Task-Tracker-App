const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { createProject, getProjects } = require('../controllers/projectControllers');

router.route('/')
    .post(protect, createProject)
    .get(protect, getProjects);

module.exports = router;
