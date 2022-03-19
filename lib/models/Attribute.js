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

  static async updateById(id, { name, stats }) {
    const oldAttribute = await Attribute.getById(id);

    if (!oldAttribute) return null;

    const newName = name ?? oldAttribute.name;
    const newStats = stats ?? oldAttribute.stats;

    const { rows } = await pool.query(
      'UPDATE attributes SET name=$2, stats=$3 WHERE id=$1 RETURNING *;',
      [id, newName, newStats]
    );
    return new Attribute(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM attributes WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Attribute(rows[0]);
  }

};
