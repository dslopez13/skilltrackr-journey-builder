
/**
 * Use case for deleting a skill
 */
class DeleteSkillUseCase {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }

  async execute(id) {
    const skill = await this.skillRepository.findById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }
    
    return this.skillRepository.delete(id);
  }
}

module.exports = DeleteSkillUseCase;
