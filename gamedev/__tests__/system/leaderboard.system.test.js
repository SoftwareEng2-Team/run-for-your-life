import express from 'express';
import request from 'supertest';
import path from 'path';

const app = express();
app.use(express.static(path.join(process.cwd(), 'public_html')));

describe('Leaderboard System Test', () => {
  it('should find the leaderboard.html page and load the content', async () => {
    const response = await request(app).get('/leaderboard.html').expect(200);
    expect(response.text).toContain('<div class="leaderboard-container">');
  });
});