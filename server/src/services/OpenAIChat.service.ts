import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
import { ChatMessage } from '../models/chatMessage.model';
import { mockTravelItinerary1 } from '../MockItinerary';
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
export async function sendOpenAIChat({ prompt, travelItinerary, chatHistory, additionalInfo }: ChatMessage) {
    //array of messages to be sent to chatgpt
    const messages: ChatCompletionRequestMessage[] = []

    // define chat-bot's role
    const systemMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a friendly and multilingual travel agent. You are helping the user build an itinerary.",
    }
    messages.push(systemMessage)

    const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: prompt
    }
    messages.push(userMessage)
    const contextMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: "chat history" + chatHistory.reduce((acc, cur) => acc + `prompt: ${cur.prompt} reply: ${cur.reply}}`, "")
    }
    messages.push(contextMessage)

    const itineraryContextMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: "current itinerary" + JSON.stringify(travelItinerary)
    }
    const addtionalInfoMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: "additional info" + JSON.stringify(additionalInfo)
    }
    const returnMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "help the user build an itinerary and return the updated itinerary. The Travel itinerary  strictly follow the format {startDate: date, endDate: date, schedule: [dailtItinerary]}. " +
            "Daily itinerary strictly follow the format {day: int, date: date, activities: [activity]}. Activity strictly follow the format {name: str, startTime: date, endTime: date, location: str, description: str, cost: number]}" + "provide a descriptive description for the activity" +
            "the date should follow the usertimezone specified in the additionalinfo" +
            "the current itinerary is passed in as a json oject and its started as a empty itinerary" +
            + "make sure you ask when, where and the duration before generating the itinerary" +
            "if you want to suggest an itinineray strictly return the travel itinerary following the structre and format provided above" +
            "provide a short response along with the travel itineray and specified the next line is travel itinerary by using the ``` symbol"

    }

    messages.push(itineraryContextMessage)
    messages.push(returnMessage)
    messages.push(addtionalInfoMessage)
    console.log(messages)

    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": messages
        }
    )

    return await completion.data.choices
}