// Keona Abad System Run Tracking Test
import puppeteer from 'puppeteer';

const BASE_URL = 'https://run-for-your-life-api.onrender.com';

describe('System Test: User Registration, Run Submission & Leaderboard Update', () => {
    let browser, page;
    let testEmail = `testuser${Date.now()}@example.com`;
    let testUsername = `TestUser${Date.now()}`;
    let testPassword = 'SecurePass123';
    let userId = null;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('Registers a new user', async () => {
        const response = await page.evaluate(async (BASE_URL, email, username, password) => {
            const res = await fetch(`${BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });
            return res.json();
        }, BASE_URL, testEmail, testUsername, testPassword);

        expect(response).toHaveProperty('user_id');
        userId = response.user_id;
    });

    it('Logs in the user', async () => {
        const response = await page.evaluate(async (BASE_URL, email, password) => {
            const res = await fetch(`${BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            return res.json();
        }, BASE_URL, testEmail, testPassword);

        expect(response).toHaveProperty('user_id');
        expect(response.user_id).toBe(userId);
    });

    it('Submits a run for the user', async () => {
        const response = await page.evaluate(async (BASE_URL, userId) => {
            const res = await fetch(`${BASE_URL}/api/runs/run`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    start_time: new Date().toISOString(),
                    end_time: new Date().toISOString(),
                    distance: 2.5,
                    route_coords: [{ lat: 44.5646, lng: -123.2620 }]
                })
            });

            const text = await res.text();  
            console.log("Submit Run Response:", text);  
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error("JSON Parsing Error:", text);
                throw new Error(`Invalid JSON response: ${text}`);
            }
        }, BASE_URL, userId);

        expect(response).toHaveProperty('run_id');
    });

    it('Fetches updated leaderboard', async () => {
        const response = await page.evaluate(async (BASE_URL) => {
            const res = await fetch(`${BASE_URL}/api/leaderboard`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const text = await res.text(); 
            console.log("Leaderboard Response:", text);  
            
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error("JSON Parsing Error:", text);
                throw new Error(`Invalid JSON response: ${text}`);
            }
        }, BASE_URL);

        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThan(0);
    });
});
