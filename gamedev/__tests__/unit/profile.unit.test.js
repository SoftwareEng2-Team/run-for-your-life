import { updateProfile, getUserProfile } from '../public_html/profile.js';

describe('Profile Unit Tests', () => {
  test('updateProfile updates user data correctly', () => {
    const mockUser = { username: 'testuser', email: 'test@example.com' };
    const newEmail = 'updated@example.com';
    
    const updatedUser = updateProfile(mockUser, { email: newEmail });

    expect(updatedUser.email).toBe(newEmail);
  });

  test('getUserProfile returns user profile correctly', () => {
    const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser
    });

    return getUserProfile(1).then(data => {
      expect(data).toEqual(mockUser);
    });
  });
});
