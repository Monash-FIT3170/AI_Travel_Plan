
// Functoion to get the currency exchange rate against AUD.

export async function getExchangeRateWithAUD(countryName: string): Promise<{ forexRate: number, currencyCode: string } | null> {
    // Get the country code from the country name
    const countryCode = await getCountryCodeFromAPI(countryName);
    if (countryCode === null) {
      console.log('Country code not found or error occurred.');
      return null;
    }
  
    console.log(`Country code for ${countryName}: ${countryCode}`);
  
    // Get the currency code from the country code
    let currencyCode = await getCurrencyCodeFromCountryCode(countryCode);
    if (currencyCode === null) {
      console.log('Currency code not found or error occurred.');
      return null;
    }
  
    currencyCode = currencyCode.toLowerCase();
  
    console.log(`Currency code for ${countryCode}: ${currencyCode}`);
  
    
  
    // Get the forex rate for the obtained currency code against AUD
    const forexRate = await getForexRateFromAPI(currencyCode); 

    currencyCode = currencyCode.toUpperCase();
    if (forexRate !== null) {
      return {
        forexRate: forexRate,
        currencyCode: currencyCode,
      };
    } else {
      console.log(`Forex rate or country code not found for ${countryName}.`);
      return null;
    }
  }













  interface CountryData {
    name: string;
    official_name: string;
    cca2: string;
    // Add other relevant properties as needed...
    currencies: {
      currencyCode: string
      name: string;
      symbol: string;
        // Add other relevant properties as needed...
      };
    };

interface ForexRateData {
  [targetCurrencyCode: string]: number;
  // Forex rate data is expected to have currency codes as keys and numeric rates as values
}


export async function getCountryCodeFromAPI(countryName: string): Promise<string | null> {
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Error fetching data from the API. Status:', response.status);
      return null;
    }

    const responseData = await response.json() as Record<string, CountryData>;
    // Extract the country code from the API response
  
    const countryCode = Object.keys(responseData)[0];
    // Check if the API response contains the country data
    if (countryCode && responseData[countryCode]) {
      const countryData = responseData[countryCode];
      const alpha2Code = countryData.cca2;
      return alpha2Code || null;
    } else {
      console.error('Country data not found in the API response.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    return null;
  }
}


export async function getCurrencyCodeFromCountryCode(countryCode: string): Promise<string | null> {
  const apiUrl = `https://restcountries.com/v2/alpha/${countryCode}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Error fetching country data from the API.');
      return null;
    }

    const responseData = await response.json();
    const currencyData = responseData.currencies[0];
    if (currencyData && currencyData.code) {
      const currencyCode = currencyData.code;
      return currencyCode;
    } else {
      console.error('Currency code not found in the API response.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    return null;
  }
}


export async function getForexRateFromAPI(targetCurrencyCode: string): Promise<number | null> {
    const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud/${encodeURIComponent(targetCurrencyCode)}.json`;
  
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json() as ForexRateData;
  
        // Check if the target currency rate exists in the API response
        if (targetCurrencyCode in data) {
          const forexRate = data[targetCurrencyCode];
          return forexRate;
        } else {
          console.error(`Forex rate for ${targetCurrencyCode} not found in the API response.`);
          return null;
        }
      } else {
        console.error('Error fetching forex rate from the API.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      return null;
    }
  }




