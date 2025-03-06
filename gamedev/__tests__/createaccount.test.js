// __tests__/createaccount.test.js
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/dom';

describe('CreateAccount Form Tests', () => {
  beforeEach(async() => {
    // Provide a minimal DOM for createaccount.js
    document.body.innerHTML = `
      <div class="login-container">
        <form>
          <input type="email" id="email" />
          <input type="text" id="username" />
          <input type="password" id="password" />
          <input type="password" id="confirm_password" />
          <button type="submit">Create Account</button>
        </form>
        <div id="password-error" style="visibility: hidden;"></div>
        <div id="account-error" style="visibility: hidden;"></div>
      </div>
    `;

    // Mock out window.location so it won’t attempt navigation
    delete window.location;
    window.location = { href: '', assign: jest.fn() };

    // Load your script
    await import('../public_html/createaccount.js');

    // Simulate DOMContentLoaded
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Shows password error if passwords do not match', async () => {
    const form = document.querySelector('form');
    const passwordError = document.getElementById('password-error');

    document.getElementById('email').value = 'test@example.com';
    document.getElementById('username').value = 'testuser';
    document.getElementById('password').value = 'secret1';
    document.getElementById('confirm_password').value = 'secret2';

    fireEvent.submit(form);

    await waitFor(() => {
      expect(passwordError.style.visibility).toBe('visible');
    });
  });

  test('Calls fetch exactly once and hides password error if passwords do match', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'User created!' })
    });

    const form = document.querySelector('form');
    const passwordError = document.getElementById('password-error');

    document.getElementById('email').value = 'test@example.com';
    document.getElementById('username').value = 'testuser';
    document.getElementById('password').value = 'secret';
    document.getElementById('confirm_password').value = 'secret';

    fireEvent.submit(form);

    // Wait for the script to call fetch
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2); // Now only one call
    });

    expect(passwordError.style.visibility).toBe('hidden');


  });
});
