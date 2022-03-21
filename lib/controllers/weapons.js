const { Router } = require('express');
const Weapon = require('../models/Weapon');

module.exports = Router()
  .post('/', async (req, res) => {
    const weapon = await Weapon.create(req.body);
    res.json(weapon);
  });
