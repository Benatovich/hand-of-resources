const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Attribute = require('../lib/models/Attribute');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the attributes table', async () => {
    const res = await request(app)
      .post('/api/v1/attributes')
      .send({
        name: 'vigor',
        stats: 'hp, defense'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'vigor',
      stats: 'hp, defense'
    });
  });

  it('gets a list of attributes', async () => {
    await Attribute.create({ name: 'endurance', stats: 'stamina' });
    const res = await request(app)
      .get('/api/v1/attributes');

    expect(res.body).toEqual(
      await Attribute.getAll()
    );
  });

  it('gets an attribute by id', async () => {
    const expected = await Attribute.create({ name: 'mind', stats: 'fp' });
    const res = await request(app)
      .get(`/api/v1/attributes/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates an attribute by id', async () => {
    const expected = await Attribute.create({ name: 'vigor', stats: 'hp' });
    const res = await request(app)
      .patch(`/api/v1/attributes/${expected.id}`)
      .send({ name: 'vigor' });

    expect(res.body).toEqual(expected);
  });

});
