describe('Profile System Tests', () => {
    beforeAll(() => {
      jest.setTimeout(10000); // Ensure long test runs complete
    });
  
    test('User can update profile in production', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Profile updated successfully' })
      });
  
      document.body.innerHTML = `
        <form id="profile-form">
          <input type="text" id="username" value="testuser" />
          <input type="email" id="email" value="updated@example.com" />
          <button type="submit">Save</button>
        </form>
      `;
  
      const form = document.getElementById('profile-form');
      fireEvent.submit(form);
  
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
  
      expect(global.fetch).toHaveBeenCalledWith('/api/profile', expect.objectContaining({
        method: 'POST'
      }));
    });
  });
  