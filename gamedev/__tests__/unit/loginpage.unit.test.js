import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals';
import { fireEvent, waitFor, within } from '@testing-library/dom';

describe('CreateAccount Form Tests', () => {
    let dom;

    beforeEach(async () => {
        dom = new JSDOM(`<!DOCTYPE html>
        <html>
            <body>
                <div id="login-container">
                    <form>
                        <input type="email" id="email" />
                        <input type="password" id="password" />
                        <button type="submit">Log In</button>
                    </form>
                </div>
                <div id="login-error-message" style="visibility: hidden;"></div>
            </body>
        </html>`);
    
        // Mock window and document
        global.window = dom.window;
        global.document = dom.window.document;
    
        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };
    
        // Mock global location
        global.location = {
            href: 'http://localhost/',
            assign: jest.fn(),
            replace: jest.fn(),
        };
    
        // Polyfill for requestSubmit if needed
        dom.window.HTMLFormElement.prototype.requestSubmit = function () {
            this.dispatchEvent(new dom.window.Event('submit', {
                bubbles: true,
                cancelable: true
            }));
        };
    
        jest.resetModules();
        global.fetch = jest.fn().mockResolvedValue({
            ok: false, // Simulate incorrect login
            json: () => Promise.resolve({ error: "Invalid credentials" })
        });
    
        await import('../../public_html/loginpage.js');
    
        document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
        await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    test('Shows error if login credentials are not correct', async () => {
        const container = within(document.getElementById('login-container'));
        const passwordError = document.getElementById('login-error-message');

        document.getElementById('email').value = 'test@example.com';
        document.getElementById('password').value = 'incorrectpass';

        fireEvent.click(container.getByText('Log In'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(passwordError.style.visibility).toBe('visible');
        });
    });
});
