const { Router } = require('express');
const Attribute = require('../models/Attribute');

module.exports = Router()
  .post('/', async (req, res) => {
    const attribute = await Attribute.create(req.body);
    res.json(attribute);
  })

  .get('/', async (req, res) => {
    const attribute = await Attribute.getAll(req.body);
    res.json(attribute);
  })

  .get('/:id', async (req, res) => {
    const attribute = await Attribute.getById(req.params.id, req.body);
    res.json(attribute);
  })

  .patch('/:id', async (req, res) => {
    const attribute = await Attribute.updateById(req.params.id, req.body);
    res.json(attribute);
  })

  .delete('/:id', async (req, res) => {
    const attribute = await Attribute.deleteById(req.params.id, req.body);
    res.json(attribute);
  });
