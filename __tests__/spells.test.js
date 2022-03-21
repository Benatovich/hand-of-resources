const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Spell = require('../lib/models/Spell');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the spells table', async () => {
    const res = await request(app)
      .post('/api/v1/spells')
      .send({
        name: 'magic missile',
        usable: 1
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'magic missile',
      usable: true
    });
  });

  it('gets a list of spells', async () => {
    await Spell.create({ name: 'fireball', usable: true });
    const res = await request(app)
      .get('/api/v1/spells');

    expect(res.body).toEqual(
      await Spell.getAll()
    );
  });

  it('gets a spell by id', async () => {
    const expected = await Spell.create({ name: 'fireball', usable: true });
    const res = await request (app)
      .get(`/api/v1/spells/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a spell by id', async () => {
    const expected = await Spell.create({ name: 'lightning bolt', usable: false });
    const res = await request(app)
      .patch(`/api/v1/spells/${expected.id}`)
      .send({ name: 'lightning bolt' });

    expect(res.body).toEqual(expected);
  });
});
