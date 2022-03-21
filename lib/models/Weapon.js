const pool = require('../utils/pool');

module.exports = class Weapon {
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
      'INSERT INTO weapons(name, usable) VALUES ($1, $2) RETURNING *;',
      [name, usable]
    );
    return new Weapon(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM weapons;');
    return rows.map((row) => new Weapon(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM weapons WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Weapon(rows[0]);
  }

  static async updateById(id, { name, usable }) {
    const oldWeapon = await Weapon.getById(id);

    if (!oldWeapon) return null;

    const newName = name ?? oldWeapon.name;
    const newUsable = usable ?? oldWeapon.usable;

    const { rows } = await pool.query(
      'UPDATE weapons SET name=$2, usable=$3 WHERE id=$1 RETURNING *;',
      [id, newName, newUsable]
    );
    return new Weapon(rows[0]);
  }

};
