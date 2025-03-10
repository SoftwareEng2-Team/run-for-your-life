// __tests__/loginpage.test.js

import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/dom';

describe('CreateAccount Form Tests', () => {
    beforeEach(async () => {
        // Provide a minimal DOM for loginpage.js
        document.body.innerHTML = `
        <div class="login-container">
          <form>
            <input type="email" id="email" />
            <input type="password" id="password" />
            <button type="submit">Log In</button>
          </form>
          <div id="login-error-message" style="visibility: hidden;"></div>
        </div>
      `;

        // Mock out window.location so it won’t attempt navigation
        delete window.location;
        window.location = { href: '', assign: jest.fn() };

        // Load your script
        await import('../public_html/index.js');

        // Simulate DOMContentLoaded
        document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    test('Shows error if login credentials are not correct', async () => {
        const form = document.querySelector('form');
        const passwordError = document.getElementById('login-error-message');

        document.getElementById('email').value = 'test@example.com';
        document.getElementById('password').value = 'incorrectpass';

        fireEvent.submit(form);

        await waitFor(() => {
            expect(passwordError.style.visibility).toBe('visible');
        });
    });

    test('', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ message: 'User logged in!' })
        });

        const form = document.querySelector('form');
        const passwordError = document.getElementById('login-error-message');

        document.getElementById('email').value = 'btmunger04@gmail.com';
        document.getElementById('password').value = 'test';

        fireEvent.submit(form);

        // Wait for the script to call fetch
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2);
        });

        expect(passwordError.style.visibility).toBe('hidden');
    });
});