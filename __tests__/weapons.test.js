const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Weapon = require('../lib/models/Weapon');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the weapons table', async () => {
    const res = await request(app)
      .post('/api/v1/weapons')
      .send({
        name: 'battleaxe',
        usable: 1
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'battleaxe',
      usable: true
    });
  });

  it('gets a list of weapons', async () => {
    await Weapon.create({ name: 'battleaxe', usable: true });
    const res = await request(app)
      .get('/api/v1/weapons');

    expect(res.body).toEqual(
      await Weapon.getAll()
    );
  });

  it('gets a weapon by id', async () => {
    const expected = await Weapon.create({ name: 'battleaxe', usable: true });
    const res = await request (app)
      .get(`/api/v1/weapons/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a weapon by id', async () => {
    const expected = await Weapon.create({ name: 'battleaxe', usable: false });
    const res = await request(app)
      .patch(`/api/v1/weapons/${expected.id}`)
      .send({ name: 'battleaxe' });

    expect(res.body).toEqual(expected);
  });

});
