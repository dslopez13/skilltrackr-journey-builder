
const express = require('express');

function setupSkillRoutes(skillController) {
  const router = express.Router();

  // GET all skills
  router.get('/skills', (req, res) => skillController.getAllSkills(req, res));

  // GET a single skill by ID
  router.get('/skills/:id', (req, res) => skillController.getSkillById(req, res));

  // POST create a new skill
  router.post('/skills', (req, res) => skillController.createSkill(req, res));

  // PUT update a skill
  router.put('/skills/:id', (req, res) => skillController.updateSkill(req, res));

  // DELETE a skill
  router.delete('/skills/:id', (req, res) => skillController.deleteSkill(req, res));

  return router;
}

module.exports = setupSkillRoutes;
