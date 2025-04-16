
/**
 * Use case for updating an existing skill
 */
const Skill = require('../../domain/models/skill');

class UpdateSkillUseCase {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }

  async execute(id, skillData) {
    const existingSkill = await this.skillRepository.findById(id);
    if (!existingSkill) {
      throw new Error('Skill not found');
    }
    
    const updatedSkill = new Skill({
      ...existingSkill,
      ...skillData,
      id
    });
    
    updatedSkill.validate();
    return this.skillRepository.update(id, updatedSkill);
  }
}

module.exports = UpdateSkillUseCase;
