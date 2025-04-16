
/**
 * Skill domain model
 */
class Skill {
  constructor({
    id,
    title,
    description,
    tags,
    level,
    startDate,
    endDate,
    progress
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags || [];
    this.level = level;
    this.startDate = startDate;
    this.endDate = endDate;
    this.progress = progress || 0;
  }

  validate() {
    if (!this.title) throw new Error('Title is required');
    if (!this.description) throw new Error('Description is required');
    if (!this.level) throw new Error('Level is required');
    if (!this.startDate) throw new Error('Start date is required');
    
    if (!['beginner', 'intermediate', 'advanced'].includes(this.level)) {
      throw new Error('Level must be beginner, intermediate or advanced');
    }
    
    if (this.progress < 0 || this.progress > 100) {
      throw new Error('Progress must be between 0 and 100');
    }
    
    return true;
  }
}

module.exports = Skill;
