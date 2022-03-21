const pool = require('../utils/pool');

module.exports = class Spell {
  id;
  name;
  usable;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.usable = row.usable;
  }

  static async create({ name, usable }) {
    const { rows } = await pool.query(
      'INSERT INTO spells(name, usable) VALUES ($1, $2) RETURNING *;',
      [name, usable]
    );
    return new Spell(rows[0]);
  }};
