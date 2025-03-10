// Keona Abad Fetch Leaderboard Unit Test
import { jest } from '@jest/globals';
import { fetchLeaderboard } from '../../public_html/backend';

// Manually mock `fetch` as a global function
global.fetch = jest.fn();

describe('fetchLeaderboard', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch leaderboard data successfully', async () => {
        const mockData = [{ name: 'Player1', score: 100 }, { name: 'Player2', score: 500 }];
        
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        await fetchLeaderboard();
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/leaderboard'));
    });

    it('should handle fetch errors properly', async () => {
        global.fetch.mockRejectedValue(new Error('Network Error'));

        await expect(fetchLeaderboard()).rejects.toThrow('Network Error');
    });
});
