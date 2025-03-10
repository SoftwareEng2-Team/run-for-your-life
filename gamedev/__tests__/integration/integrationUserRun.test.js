// Keona Abad Integration User Run Test
import request from 'supertest';
import app from '../../server'; 

describe('Integration Test: User Registration, Run Submission & Leaderboard', () => {
    let userId;
    let userEmail = `testuser${Date.now()}@example.com`;
    let userPassword = 'SecurePass123';

    it('Registers a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: `TestUser${Date.now()}`,
                email: userEmail,
                password: userPassword
            });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('user_id');
        userId = res.body.user_id;
    });

    it('Logs in the user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: userEmail, password: userPassword });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('user_id');
        expect(res.body.user_id).toBe(userId);
    });

    it('Submits a run for the user', async () => {
        const res = await request(app)
            .post('/api/runs/run')
            .send({
                user_id: userId,
                start_time: new Date().toISOString(),
                end_time: new Date().toISOString(),
                distance: 3.5,
                route_coords: [{ lat: 44.5646, lng: -123.2620 }]
            });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('run_id');
    });

    it('Fetches user profile and checks updated distance', async () => {
        const res = await request(app)
            .post('/api/profile')
            .send({ user_id: userId });
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('total_distance_ran');
        expect(res.body.total_distance_ran).toBeGreaterThanOrEqual(3.5);
    });

    it('Fetches leaderboard and verifies user presence', async () => {
        const res = await request(app)
            .post('/api/leaderboard');
        
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.some(user => user.user_id === userId)).toBe(true);
    });
});
