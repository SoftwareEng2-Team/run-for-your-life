// Mock the Google Maps API
// Author: James Nichols

import { expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { calculateAverageLocation } from '../../public_html/geolocation';

describe('calculateAverageLocation', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn(() => 'user123'),
            setItem: jest.fn(),
        };
    });

    test('should call calculateAverageLocation with the correct user position', () => {
        // Mock user position
        const userPosition = { lat: 44.5646, lng: -123.2620 };
        const testLocation = [userPosition, { lat: 44.5646, lng: -123.2620 }, { lat: 44.5646, lng: -123.2620 }];
        
        // Call the function
        const testAnswer = calculateAverageLocation(testLocation);
        
        // Verify that the function returns the correct average location
        expect(testAnswer).toEqual({ lat: 44.564600000000006, lng: -123.2620 });
    });
});
