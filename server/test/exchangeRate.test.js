import {
    getExchangeRateWithAUD,
    getCountryCodeFromAPI,
    getCurrencyCodeFromCountryCode,
    getForexRateFromAPI,
  } from '../src/services/CurrencyConversion.service';
  
  describe('Currency Conversion Service Tests', () => {
    // Mock the fetch function to control API responses
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    // Test Case 1: Test a successful exchange rate retrieval
    it('should return the exchange rate and currency code for a valid country', async () => {
      // Mock API responses
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => ({
          "USD": 1.25, // Replace with the appropriate exchange rate
        }),
      });
  
      const result = await getExchangeRateWithAUD('United States');
      expect(result).toEqual({ forexRate: 1.25, currencyCode: 'USD' });
    });
  
    // Test Case 2: Test an invalid country name
    it('should return null for an invalid country name', async () => {
      // Mock API response for getCountryCodeFromAPI
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
      });
  
      const result = await getExchangeRateWithAUD('InvalidCountry');
      expect(result).toBeNull();
    });
  
    // Test Case 3: Test failure to get currency code
    it('should return null if it fails to get the currency code', async () => {
      // Mock API response for getCountryCodeFromAPI
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => ({
          "cca2": "US", // Valid country code, but no currency data
        }),
      });
  
      const result = await getExchangeRateWithAUD('United States');
      expect(result).toBeNull();
    });
  
    // Test Case 4: Test failure to get forex rate
    it('should return null if it fails to get the forex rate', async () => {
      // Mock API responses
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => ({
          "USD": 1.25, // Valid exchange rate data
        }),
      });
  
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500, // Simulate API failure
      });
  
      const result = await getExchangeRateWithAUD('United States');
      expect(result).toBeNull();
    });
  });
  