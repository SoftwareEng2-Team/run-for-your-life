import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import '../public_html/loginpage.js';

describe('loginpage.js Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input id="email" />
        <input id="password" />
        <button type="submit">Login</button>
      </form>
      <div id="login-error-message"></div>
    `;
    fetchMock.resetMocks();
  });

  // UNIT test: "login" logic if credentials are correct
  test('UNIT: Successful login fetch sets user_id in localStorage', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user_id: 999 }), { status: 200 });
    const setItemSpy = jest.spyOn(window.localStorage, 'setItem');

    document.getElementById('email').value = 'test@example.com';
    document.getElementById('password').value = 'secret';
    document.querySelector('form').dispatchEvent(new Event('submit'));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(setItemSpy).toHaveBeenCalledWith('user_id', 999);
  });

  // VALIDATION test: If credentials are wrong, we show an error
  test('VALIDATION: login error message is visible on failed login', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Bad credentials' }), { status: 401 });

    document.getElementById('email').value = 'nope@example.com';
    document.getElementById('password').value = 'wrong';
    document.querySelector('form').dispatchEvent(new Event('submit'));

    await new Promise(resolve => setTimeout(resolve, 0));

    const errorMsg = document.getElementById('login-error-message');
    expect(errorMsg.style.visibility).toBe('visible');
  });
});
