// __tests__/loginpage.test.js
import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals';
import { fireEvent, waitFor, within } from '@testing-library/dom';

describe('CreateAccount Form Tests', () => {
    let dom;

    beforeEach(async () => {
        // Initialize JSDOM with explicit HTML structure
        dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
            <body>
                <div class="login-container">
                    <form>
                        <input type="email" id="email" />
                        <input type="password" id="password" />
                        <button type="submit">Log In</button>
                    </form>
                </div>
                <div id="login-error-message" style="visibility: hidden;"></div>
            </body>
        </html>
      `);

        global.document = dom.window.document;
        global.HTMLFormElement = dom.window.HTMLFormElement;

        // Add polyfill
        HTMLFormElement.prototype.requestSubmit = function () {
            this.dispatchEvent(new dom.window.Event('submit', {
                bubbles: true,
                cancelable: true
            }));
        };

        jest.resetModules();
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve('Success')
        });

        await import('../../public_html/loginpage.js');

        // Wait for event listeners to attach
        document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
        await new Promise(resolve => setTimeout(resolve, 10));
    });

    test('Shows error if login credentials are not correct', async () => {
        const container = within(document.getElementByClass('login-container'));

        document.getElementById('email').value = 'test@example.com';
        document.getElementById('password').value = 'incorrectpass';

        fireEvent.submit(form);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(passwordError.style.visibility).toBe('visible');
        });
    });
});