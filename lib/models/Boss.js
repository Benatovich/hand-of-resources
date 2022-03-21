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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM bosses;');
    return rows.map((row) => new Boss(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM bosses WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Boss(rows[0]);
  }


};
