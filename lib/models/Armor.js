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
    const { rows } = await pool.query('SELECT * FROM armors;');
    return rows.map((row) => new Armor(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM armors WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Armor(rows[0]);
  }

  static async updateById(id, { name, physical, magic, fire, lightning, holy }) {
    const oldArmor = await Armor.getById(id);

    if (!oldArmor) return null;

    const newName = name ?? oldArmor.name;
    const newPhys = physical ?? oldArmor.physical;
    const newMagic = magic ?? oldArmor.magic;
    const newFire = fire ?? oldArmor.fire;
    const newLightning = lightning ?? oldArmor.lightning;
    const newHoly = holy ?? oldArmor.holy;

    const { rows } = await pool.query(
      'UPDATE armors SET name=$2, physical=$3, magic=$4, fire=$5, lightning=$6, holy=$7 WHERE id=$1 RETURNING *;',
      [id, newName, newPhys, newMagic, newFire, newLightning, newHoly]
    );
    return new Armor(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM armors WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Armor(rows[0]);
  }


  
};
