import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import '../public_html/createaccount.js';

describe('[Team Member 2] createaccount.js Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input id="email" />
        <input id="username" />
        <input id="password" />
        <input id="confirm_password" />
        <button type="submit">Create Account</button>
      </form>
      <div id="password-error"></div>
      <div id="account-error"></div>
    `;
    fetchMock.resetMocks();
  });

  // UNIT test: check simple password match function (extracted for test)
  // If you don't have a separate function, we can just test a snippet:
  test('UNIT: Create account displays password error if passwords do not match', () => {
    const passwordError = document.getElementById('password-error');
    passwordError.style.visibility = 'hidden';

    // Simulate mismatch
    document.getElementById('password').value = 'abc';
    document.getElementById('confirm_password').value = 'xyz';

    // Submit form
    document.querySelector('form').dispatchEvent(new Event('submit'));

    // We expect "password-error" to be visible
    expect(passwordError.style.visibility).toBe('visible');
  });

  // VALIDATION test: confirm successful account creation calls fetch with correct payload
  test('VALIDATION: Submitting matching passwords calls fetch', async () => {
    // Provide a successful mock
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });

    document.getElementById('email').value = 'test@example.com';
    document.getElementById('username').value = 'myUser';
    document.getElementById('password').value = 'secret';
    document.getElementById('confirm_password').value = 'secret';

    // Submit the form
    const form = document.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    // Wait a tick for the async code
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check fetch was called with correct body
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/users/register'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          username: 'myUser',
          email: 'test@example.com',
          password: 'secret'
        })
      })
    );
  });
});
