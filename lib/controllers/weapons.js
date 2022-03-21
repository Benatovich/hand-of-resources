const { Router } = require('express');
const Weapon = require('../models/Weapon');

module.exports = Router()
  .post('/', async (req, res) => {
    const weapon = await Weapon.create(req.body);
    res.json(weapon);
  })

  .get('/', async (req, res) => {
    const weapon = await Weapon.getAll(req.body);
    res.json(weapon);
  });
