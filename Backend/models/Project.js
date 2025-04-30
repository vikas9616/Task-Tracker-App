const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Project', projectSchema);
// This code defines a Mongoose schema for a "Project" model in a MongoDB database. The schema includes fields for the project's name and a reference to the user who created it. The model is then exported for use in other parts of the application.