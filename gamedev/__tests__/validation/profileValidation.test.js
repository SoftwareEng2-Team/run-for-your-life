import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/dom';

describe('Profile Form Validation Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="profile-form">
        <input type="text" id="username" required />
        <input type="email" id="email" required />
        <button type="submit">Save</button>
        <div id="error-message" style="visibility: hidden;"></div>
      </form>
    `;

    // Simulate profile.js script
    import('../../public_html/profile.js');
  });

  test('Shows error if username is empty', async () => {
    const form = document.getElementById('profile-form');
    const errorMessage = document.getElementById('error-message');

    document.getElementById('username').value = ''; // Empty username
    document.getElementById('email').value = 'test@example.com';

    fireEvent.submit(form);

    await waitFor(() => {
      expect(errorMessage.style.visibility).toBe('visible');
    });
  });

  test('Does not allow invalid email format', async () => {
    const form = document.getElementById('profile-form');
    const emailInput = document.getElementById('email');

    emailInput.value = 'invalid-email';

    fireEvent.submit(form);

    await waitFor(() => {
      expect(emailInput.validationMessage).not.toBe('');
    });
  });
});
