
/**
 * Use case for retrieving all skills
 */
class GetAllSkillsUseCase {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }

  async execute() {
    return this.skillRepository.findAll();
  }
}

module.exports = GetAllSkillsUseCase;
