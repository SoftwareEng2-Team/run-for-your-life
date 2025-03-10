// Keona Abad Fetch Leaderboard Unit Test
const fetch = require('node-fetch');
const { fetchLeaderboard } = require('../../public_html/backend');

jest.mock('node-fetch', () => jest.fn());

describe('fetchLeaderboard', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch leaderboard data successfully', async () => {
        const mockData = [{ name: 'Player1', score: 100 }, { name: 'Player2', score: 500 }];
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        await fetchLeaderboard();
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/leaderboard'));
    });

    it('should handle fetch errors properly', async () => {
        fetch.mockRejectedValue(new Error('Network Error'));
        await expect(fetchLeaderboard()).rejects.toThrow('Network Error');
    });

});
