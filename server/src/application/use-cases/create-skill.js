
/**
 * Use case for creating a new skill
 */
const Skill = require('../../domain/models/skill');

class CreateSkillUseCase {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }

  async execute(skillData) {
    const skill = new Skill(skillData);
    skill.validate();
    return this.skillRepository.create(skill);
  }
}

module.exports = CreateSkillUseCase;
