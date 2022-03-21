const { Router } = require('express');
const Spell = require('../models/Spell');

module.exports = Router()
  .post('/', async (req, res) => {
    const spell = await Spell.create(req.body);
    res.json(spell);
  })

  .get('/', async (req, res) => {
    const spell = await Spell.getAll(req.body);
    res.json(spell);
  });
