// __tests__/loginpage.test.js
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/dom';

describe('Login Page Tests', () => {
  beforeEach(async () => {
    // Minimal HTML from index.html (loginpage)
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

    // Mock window.location so it doesn't try real navigation
    delete window.location;
    window.location = { href: '', assign: jest.fn() };

    // **Use dynamic import instead of require**
    await import('../public_html/loginpage.js');

    // Fire DOMContentLoaded so the form listener is attached
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Shows error if credentials are invalid', async () => {
    // Mock a failed login attempt
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' })
    });

    const form = document.querySelector('form');
    const errorDiv = document.getElementById('login-error-message');
    document.getElementById('email').value = 'invalid@example.com';
    document.getElementById('password').value = 'wrongpw';

    fireEvent.submit(form);

    // Wait for fetch + check error is shown
    await waitFor(() => {
      expect(errorDiv.style.visibility).toBe('visible');
    });
    // fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Successful login calls fetch and redirects', async () => {
    // Mock a successful login
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user_id: 123 })
    });

    // Mock localStorage
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');

    const form = document.querySelector('form');
    const errorDiv = document.getElementById('login-error-message');
    document.getElementById('email').value = 'valid@example.com';
    document.getElementById('password').value = 'correctpw';

    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    // Check that error stayed hidden
    expect(errorDiv.style.visibility).toBe('hidden');
    // Check localStorage was set
    expect(setItemSpy).toHaveBeenCalledWith('user_id', 123);
    // Check that we tried to redirect
    expect(window.location.href).toContain('profile.html');
  });
});
