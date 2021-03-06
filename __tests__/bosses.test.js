const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Boss = require('../lib/models/Boss');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the bosses table', async () => {
    const res = await request(app)
      .post('/api/v1/bosses')
      .send({
        name: 'Hank',
        defeated: 1
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Hank',
      defeated: true
    });
  });

  it('gets a list of bosses', async () => {
    await Boss.create({ name: 'Magrit', defeated: true });
    const res = await request(app)
      .get('/api/v1/bosses');

    expect(res.body).toEqual(
      await Boss.getAll()
    );
  });

  it('gets a boss by id', async () => {
    const expected = await Boss.create({ name: 'Godric', defeated: true });
    const res = await request (app)
      .get(`/api/v1/bosses/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a boss by id', async () => {
    const expected = await Boss.create({ name: 'Radahn', defeated: false });
    const res = await request(app)
      .patch(`/api/v1/bosses/${expected.id}`)
      .send({ name: 'Radahn' });

    expect(res.body).toEqual(expected);
  });

  it('deletes a boss by id', async () => {
    const expected = await Boss.create({ name: 'Leonard', defeated: false });
    const res = await request(app)
      .delete(`/api/v1/bosses/${expected.id}`);

    expect(res.body).toEqual(expected);
    expect(await Boss.getById(expected.id)).toBeNull();
  });

});
