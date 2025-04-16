
const GetAllSkillsUseCase = require('../../../application/use-cases/get-all-skills');
const GetSkillByIdUseCase = require('../../../application/use-cases/get-skill-by-id');
const CreateSkillUseCase = require('../../../application/use-cases/create-skill');
const UpdateSkillUseCase = require('../../../application/use-cases/update-skill');
const DeleteSkillUseCase = require('../../../application/use-cases/delete-skill');

class SkillController {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }

  async getAllSkills(req, res) {
    try {
      const getAllSkillsUseCase = new GetAllSkillsUseCase(this.skillRepository);
      const skills = await getAllSkillsUseCase.execute();
      res.json(skills);
    } catch (error) {
      console.error('Error getting all skills:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getSkillById(req, res) {
    try {
      const getSkillByIdUseCase = new GetSkillByIdUseCase(this.skillRepository);
      const skill = await getSkillByIdUseCase.execute(req.params.id);
      res.json(skill);
    } catch (error) {
      console.error('Error getting skill by ID:', error);
      if (error.message === 'Skill not found') {
        res.status(404).json({ message: 'Skill not found' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async createSkill(req, res) {
    try {
      const createSkillUseCase = new CreateSkillUseCase(this.skillRepository);
      const skill = await createSkillUseCase.execute(req.body);
      res.status(201).json(skill);
    } catch (error) {
      console.error('Error creating skill:', error);
      if (error.message.includes('required') || error.message.includes('must be')) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async updateSkill(req, res) {
    try {
      const updateSkillUseCase = new UpdateSkillUseCase(this.skillRepository);
      const skill = await updateSkillUseCase.execute(req.params.id, req.body);
      res.json(skill);
    } catch (error) {
      console.error('Error updating skill:', error);
      if (error.message === 'Skill not found') {
        res.status(404).json({ message: 'Skill not found' });
      } else if (error.message.includes('required') || error.message.includes('must be')) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async deleteSkill(req, res) {
    try {
      const deleteSkillUseCase = new DeleteSkillUseCase(this.skillRepository);
      await deleteSkillUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting skill:', error);
      if (error.message === 'Skill not found') {
        res.status(404).json({ message: 'Skill not found' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}

module.exports = SkillController;
