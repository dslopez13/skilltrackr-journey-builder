
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for skills
let skills = [];

// Routes for skills API
// GET all skills
app.get('/api/skills', (req, res) => {
  res.json(skills);
});

// GET a single skill by ID
app.get('/api/skills/:id', (req, res) => {
  const skill = skills.find(s => s.id === req.params.id);
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  res.json(skill);
});

// POST create a new skill
app.post('/api/skills', (req, res) => {
  const { 
    title, 
    description, 
    tags, 
    level, 
    startDate, 
    endDate, 
    progress 
  } = req.body;
  
  // Validate required fields
  if (!title || !description || !level || !startDate) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  const newSkill = {
    id: uuidv4(),
    title,
    description,
    tags: tags || [],
    level,
    startDate,
    endDate,
    progress: progress || 0
  };
  
  skills.push(newSkill);
  res.status(201).json(newSkill);
});

// PUT update a skill
app.put('/api/skills/:id', (req, res) => {
  const index = skills.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  
  skills[index] = {
    ...skills[index],
    ...req.body,
    id: req.params.id // Ensure ID doesn't change
  };
  
  res.json(skills[index]);
});

// DELETE a skill
app.delete('/api/skills/:id', (req, res) => {
  const index = skills.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  
  skills.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
