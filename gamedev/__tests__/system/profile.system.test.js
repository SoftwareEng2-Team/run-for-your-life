// Calvin Chen
import express from 'express';
import request from 'supertest';
import path from 'path';

const app = express();
app.use(express.static(path.join(process.cwd(), 'public_html')));

describe('Profile System Test', () => {
  it('should serve the profile.html page', async () => {
    const response = await request(app).get('/profile.html').expect(200);
    expect(response.text).toContain('<div class="profile-container">');
  });
});