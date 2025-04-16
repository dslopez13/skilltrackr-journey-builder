
/**
 * Use case for retrieving a skill by ID
 */
class GetSkillByIdUseCase {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }

  async execute(id) {
    const skill = await this.skillRepository.findById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }
    return skill;
  }
}

module.exports = GetSkillByIdUseCase;
