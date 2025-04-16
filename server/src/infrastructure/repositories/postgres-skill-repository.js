
const SkillRepository = require('../../application/repositories/skill-repository');
const Skill = require('../../domain/models/skill');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class PostgresSkillRepository extends SkillRepository {
  async findAll() {
    const result = await db.query('SELECT * FROM skills ORDER BY title');
    return result.rows.map(row => new Skill(row));
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM skills WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return new Skill(result.rows[0]);
  }

  async create(skill) {
    const id = skill.id || uuidv4();
    const query = `
      INSERT INTO skills (id, title, description, tags, level, start_date, end_date, progress)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [
      id,
      skill.title,
      skill.description,
      JSON.stringify(skill.tags),
      skill.level,
      skill.startDate,
      skill.endDate,
      skill.progress
    ];
    
    const result = await db.query(query, values);
    return new Skill({
      ...result.rows[0],
      tags: JSON.parse(result.rows[0].tags)
    });
  }

  async update(id, skill) {
    const query = `
      UPDATE skills
      SET title = $1, description = $2, tags = $3, level = $4, start_date = $5, end_date = $6, progress = $7
      WHERE id = $8
      RETURNING *
    `;
    
    const values = [
      skill.title,
      skill.description,
      JSON.stringify(skill.tags),
      skill.level,
      skill.startDate,
      skill.endDate,
      skill.progress,
      id
    ];
    
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    
    return new Skill({
      ...result.rows[0],
      tags: JSON.parse(result.rows[0].tags)
    });
  }

  async delete(id) {
    const result = await db.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = PostgresSkillRepository;
