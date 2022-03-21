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
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM spells;');
    return rows.map((row) => new Spell(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM spells WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Spell(rows[0]);
  }

  static async updateById(id, { name, usable }) {
    const oldSpell = await Spell.getById(id);

    if (!oldSpell) return null;

    const newName = name ?? oldSpell.name;
    const newUsable = usable ?? oldSpell.usable;

    const { rows } = await pool.query(
      'UPDATE spells SET name=$2, usable=$3 WHERE id=$1 RETURNING *;',
      [id, newName, newUsable]
    );
    return new Spell(rows[0]);
  }

};
