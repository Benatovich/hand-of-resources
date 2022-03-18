const pool = require('../utils/pool');

module.exports = class Attribute {
  id;
  name;
  stats;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.stats = row.stats;
  }

  static async create({ name, stats }) {
    const { rows } = await pool.query(
      'INSERT INTO attributes(name, stats) VALUES ($1, $2) RETURNING *;',
      [name, stats]
    );
    return new Attribute(rows[0]);
  }




};
