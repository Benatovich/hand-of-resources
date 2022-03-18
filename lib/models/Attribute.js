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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM attributes;');
    return rows.map((row) => new Attribute(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM attributes WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Attribute(rows[0]);
  }




};
