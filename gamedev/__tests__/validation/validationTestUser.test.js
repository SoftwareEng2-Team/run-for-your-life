// Keona Abad Validation Test User Test
import request from 'supertest';
import app from '../server'; 

describe('Validation Test: User Registration & Login', () => {
    let userEmail = `validuser${Date.now()}@example.com`;
    let userPassword = 'SecurePass123';
    let userId;

    it('Registers a new user with valid data', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: `ValidUser${Date.now()}`,
                email: userEmail,
                password: userPassword
            });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('user_id');
        userId = res.body.user_id;
    });

    it('Fails to register a user with missing fields', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({ email: 'missingfields@example.com' });

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error');

    });

    it('Logs in with correct credentials', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: userEmail, password: userPassword });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('user_id');
        expect(res.body.user_id).toBe(userId);
    });

    it('Fails login with incorrect password', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: userEmail, password: 'WrongPassword123' });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    it('Fails login with non-existent email', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: 'doesnotexist@example.com', password: 'SomePassword' });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
});