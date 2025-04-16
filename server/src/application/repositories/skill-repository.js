
/**
 * Interface for the Skill repository
 * This defines the contract that any skill repository implementation must follow
 */
class SkillRepository {
  async findAll() {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(skill) {
    throw new Error('Method not implemented');
  }

  async update(id, skill) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = SkillRepository;
