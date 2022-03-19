const pool = require('../utils/pool');

module.exports = class Boss {
  id;
  name;
  defeated;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.defeated = row.defeated;
  }

  static async create({ name, defeated }) {
    const { rows } = await pool.query(
      'INSERT INTO bosses(name, defeated) VALUES ($1, $2) RETURNING *;',
      [name, defeated]
    );
    return new Boss(rows[0]);
  }






};
