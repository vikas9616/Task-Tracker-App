const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userControllers');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
// This code defines the routes for user authentication in an Express.js application. It imports the necessary modules, sets up the router, and defines two routes: one for user signup and another for user login. The corresponding controller functions are imported from the userController module. Finally, the router is exported for use in other parts of the application.