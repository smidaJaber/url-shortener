import request from 'supertest';
import app from '../src/server';
import Url from '../src/models/urlModel';
import { describe, expect,it,beforeEach } from '@jest/globals';

describe('App tests', () => {
  beforeEach(async () => {
    await Url.deleteMany({});
  });

  it('should shorten a URL', async () => {
    const res = await request(app)
      .post('/shorten')
      .send({ longUrl: 'https://prototype.arcube.io' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('shortUrl');
  });

  it('should return an error for invalid URLs', async () => {
    const res = await request(app)
      .post('/shorten')
      .send({ longUrl: 'invalid-url' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid URL');
  });

  it('should return an error for duplicate custom short codes', async () => {
    await request(app)
      .post('/shorten')
      .send({ longUrl: 'https://prototype.arcube.io/', customShortCode: 'ARC' });

    const res = await request(app)
      .post('/shorten')
      .send({ longUrl: 'https://prototype.arcube.io/', customShortCode: 'ARC' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Custom short code already in use');
  });

  it('should redirect to the original URL', async () => {
    const shortenRes = await request(app)
      .post('/shorten')
      .send({ longUrl: 'https://prototype.arcube.io/' });

    const shortCode = shortenRes.body.shortUrl.split('/').pop();
    const redirectRes = await request(app).get(`/${shortCode}`);

    expect(redirectRes.statusCode).toBe(302);
    expect(redirectRes.headers.location).toBe('https://prototype.arcube.io/');
  });

  it('should return a 404 for non-existent short codes', async () => {
    const res = await request(app).get('/nonexistent');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'URL not found');
  });
});