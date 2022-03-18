const pool = require('../utils/pool');

module.exports = class Armor {
  id;
  name;
  physical;
  magic;
  fire;
  lightning;
  holy;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.physical = row.physical;
    this.magic = row.magic;
    this.fire = row.fire;
    this.lightning = row.lightning;
    this.holy = row.holy;
  }

  static async create({ name, physical, magic, fire, lightning, holy }) {
    const { rows } = await pool.query(
      'INSERT INTO armors(name, physical, magic, fire, lightning, holy) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [name, physical, magic, fire, lightning, holy]
    );
    return new Armor(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM rats;');
    return rows.map((row) => new Armor(row));
  }

};
