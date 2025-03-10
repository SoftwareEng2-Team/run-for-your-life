import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals';
import { fireEvent, waitFor, within } from '@testing-library/dom';

describe('CreateAccount Form Tests', () => {
    let dom;

    beforeEach(async () => {
        jest.setTimeout(10000);

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
            href: 'https://run-for-your-life.onrender.com/',
            assign: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(), 
            set href(value) {
                this._href = value;
            },
            get href() {
                return this._href;
            }
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
            // Simulate correct login
            ok: true, 
            json: () => Promise.resolve({ message: "Login successful", user_id: "116" })
        });
    
        await import('../../public_html/loginpage.js');
    
        document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
        await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    test('Log the user in, ensure no error message is indicated', async () => {
        const container = within(document.getElementById('login-container'));
        const passwordError = document.getElementById('login-error-message');

        document.getElementById('email').value = 'validation@testing.com';
        document.getElementById('password').value = 'testpass';

        fireEvent.click(container.getByText('Log In'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(passwordError.style.visibility).toBe('hidden');
        });
    });
});
