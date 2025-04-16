
/**
 * This is the entry point for the SkillTrackr API
 * It follows the hexagonal architecture pattern
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import infrastructure components
const PostgresSkillRepository = require('./src/infrastructure/repositories/postgres-skill-repository');
const SkillController = require('./src/infrastructure/rest/controllers/skill-controller');
const setupSkillRoutes = require('./src/infrastructure/rest/routes/skill-routes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up dependency injection
const skillRepository = new PostgresSkillRepository();
const skillController = new SkillController(skillRepository);

// Set up routes
const apiRoutes = setupSkillRoutes(skillController);
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for testing
module.exports = app;
