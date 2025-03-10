//Made by Connor Sun
import { jest } from '@jest/globals';
import bcrypt from 'bcrypt'; // Importing bcrypt

bcrypt.hash = jest.fn();
bcrypt.compare = jest.fn();

describe('Password Hash Test', () => {
    it('hashes the password correctly', async () => {
        const user = { username: 'testuser', email: 'testuser@example.com', password: 'password123' };
        
        bcrypt.hash.mockResolvedValue('mockhashedpassword');
        const hashedPassword = await bcrypt.hash(user.password, 10);

        bcrypt.compare.mockResolvedValue(true);
        const validPassword = await bcrypt.compare(user.password, hashedPassword);

        // Assertions
        expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
        expect(bcrypt.compare).toHaveBeenCalledWith(user.password, 'mockhashedpassword');
        expect(validPassword).toBe(true);
    });
    it('password does not match the hash', async () => {
        const user = { username: 'testuser', email: 'testuser@example.com', password: 'password123' };
        
        bcrypt.hash.mockResolvedValue('wrongpassword');
        const hashedPassword = await bcrypt.hash(user.password, 10);

        bcrypt.compare.mockResolvedValue(false);
        const validPassword = await bcrypt.compare(user.password, hashedPassword);

        // Assertions
        expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
        expect(bcrypt.compare).toHaveBeenCalledWith(user.password, 'wrongpassword');
        expect(validPassword).toBe(false);
    });
});
