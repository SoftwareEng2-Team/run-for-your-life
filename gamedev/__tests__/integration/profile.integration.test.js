// Calvin Chen
import { updateProfileAPI } from '../public_html/profile.js';

describe('Profile Integration Tests', () => {
  test('updateProfileAPI sends correct request to backend', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Profile updated successfully' })
    });

    const userData = { username: 'testuser', email: 'updated@example.com' };
    
    const response = await updateProfileAPI(userData);

    expect(global.fetch).toHaveBeenCalledWith('/api/profile', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(userData),
    }));

    expect(response.message).toBe('Profile updated successfully');
  });

  test('Handles API failure gracefully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to update profile' })
    });

    await expect(updateProfileAPI({ username: 'testuser' })).rejects.toThrow('Failed to update profile');
  });
});
