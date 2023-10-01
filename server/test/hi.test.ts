import { parseResponse } from "../src/controllers/ChatMessageController";
describe("parseResponse", () => {
  it("should return a string", () => {
    const response = parseResponse(
      `{"chatResponse": "Test chat response",
  "needConfirmation": true
}`
    );
    expect(response).toBe({
      "chatResponse": "Test chat response",
      "needConfirmation": true,
    });
  });

});
