// api.test.js
import { emergencyDataApi } from "../src/components/itinerary/EmergCardView";

describe('emergencyDataApi', () => {
  it('fetches data from the external API', async () => {
    // Make an actual API request
    const result = await emergencyDataApi("China");

    // Assertions
    expect(result).toBeDefined(); // Check if data is returned
    expect(result).toHaveProperty('data'); // Assuming the API returns an object with a 'message' property
  });

  it('handles API errors gracefully', async () => {
    // Simulate an API error by providing an invalid URL
    await expect(emergencyDataApi("China")).rejects.toThrow();
  });
});
