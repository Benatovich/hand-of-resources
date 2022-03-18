const { Router } = require('express');
const Attribute = require('../models/Attribute');

module.exports = Router()
  .post('/', async (req, res) => {
    const attribute = await Attribute.create(req.body);
    res.json(attribute);
  });
    
