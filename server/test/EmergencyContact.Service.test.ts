jest.mock('axios', () => {
    return {
        get: jest.fn(),
    };
});

import axios from 'axios';
import { getEmergencyContact } from '../src/services/EmergencyContact.service';
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EmergencyContact Functions', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct emergency contact when successful response', async () => {
        const mockResponse = {
            data: {
                data: {
                    country: {
                        name: 'MockCountry',
                        ISOCode: 'MC',
                        ISONumeric: '999',
                    },
                    fire: {
                        all: ['123']
                    },
                    police: {
                        all: ['456']
                    },
                    ambulance: {
                        all: ['789']
                    },
                    dispatch: {
                        all: null,
                        fixed: ['112']
                    },
                    member_112: true
                }
            },
            status: 200
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await getEmergencyContact('MockCountry');
        expect(result).toEqual({
            country: {
                countryName: 'MockCountry',
                countryISOCode: 'MC',
                countryISONumeric: '999'
            },
            fireNumber: '123',
            policeNumber: '456',
            ambulanceNumber: '789',
            universalNumber: '112'
        });
    });

    it('should handle "No Data for this Territory" response', async () => {
        const mockResponse = {
            data: {
                error: 'No Data for this Territory'
            },
            status: 200
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await getEmergencyContact('UnknownCountry');
        expect(result.universalNumber).toEqual('Your Data seems to be lost on the way');
    });

    it('should handle non-200 or 201 status codes', async () => {
        const mockResponse = {
            data: {},
            status: 404
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await getEmergencyContact('UnknownCountry');
        expect(result.universalNumber).toEqual('Error occured while fetching');
    });

    it('should handle API call errors', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

        const result = await getEmergencyContact('UnknownCountry');
        expect(result.universalNumber).toEqual('Error occured while fetching');
    });

});