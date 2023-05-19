import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
import { ChatMessage } from '../models/chatMessage.model';
dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Creates an openAI chat completion request and returns the response
 * @param message the message for api to respond to
 * @param history array of ChatHistoryItem that define the past prompts and responses to requests.
 * @returns new response to the message argument based on context provided in history argument
 */
export async function sendOpenAIChat({ prompt, travelItinerary, chatHistory }: ChatMessage) {
    //array of messages to be sent to chatgpt
    const messages: ChatCompletionRequestMessage[] = []

    // define chat-bot's role
    const systemMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a travel agent",
    }
    messages.push(systemMessage)

    const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: prompt
    }
    messages.push(userMessage)
    const contextMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: chatHistory.reduce((acc, cur) => acc + `prompt: ${cur.prompt} reply: ${cur.reply}}`, "")
    }
    messages.push(contextMessage)

    const itineraryContextMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: JSON.stringify(travelItinerary)
    }
    const returnMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "help the user build an itinerary and return the updated itinerary, the itinerary should be in the format {startDate: date, endDate: date, schedule: [dailtItinerary]}. " +
            "Daily itinerary should be in the format {day: int, date: date, activities: [activity]}. Activity should be in the format {name: str, startTime: date, endTime: date, location: str, description: str, cost: number]}" + "provide a descriptive description for the activity" +
            "the current itinerary is passed in as a json oject and its started as a empty itinerary" +
            "strictly follow itinerary structrure." + "example{startDate: 2021-07-01, endDate: 2021-07-05, schedule: [{day: 1, date: 2021-07-01, activities: [{name: 'Tokyo Tower', startTime: '2023-05 - 28T10: 00: 00.000Z', endTime: '2023-05 - 28T20: 00: 00.000Z', location: 'Tokyo', description: 'A tower in Tokyo', cost: 10}]}]}" +
            "if you want to suggest an itinineray always return the itinerary following the structre and format provided above" +
            "along with the itinerary provide a short response to the user"
    }

    messages.push(itineraryContextMessage)
    messages.push(returnMessage)
    console.log(messages)

    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": messages
        }
    )

    return await completion.data.choices
}