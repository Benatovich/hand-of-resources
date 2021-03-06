const { Router } = require('express');
const Armor = require('../models/Armor');

module.exports = Router()
  .post('/', async (req, res) => {
    const armor = await Armor.create(req.body);
    res.json(armor);
    // still not quite sure if I want res.json or res.send so we'll see if this works
  })

  .get('/', async (req, res) => {
    const armor = await Armor.getAll(req.body);
    res.json(armor);
  })

  .get('/:id', async (req, res) => {
    const armor = await Armor.getById(req.params.id, req.body);
    res.json(armor);
  })

  .patch('/:id', async (req, res) => {
    const armor = await Armor.updateById(req.params.id, req.body);
    res.json(armor);
  })

  .delete('/:id', async (req, res) => {
    const armor = await Armor.deleteById(req.params.id, req.body);
    res.json(armor);

  });
