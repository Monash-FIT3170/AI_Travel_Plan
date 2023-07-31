import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
import { ChatMessage } from '../models/chatMessage.model';
import { mockTravelItinerary1 } from '../MockItinerary';
import { json } from 'stream/consumers';
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

    const messageHistory = chatHistory.reduce((acc, cur) => acc + `Customer: ${cur.prompt}\n Agent: ${cur.reply}}`, "")

    const returnMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a friendly travel agent that is trying to help the user plan their trip and create an iteinrary for them" + "The following is a converstion between a travel agent and a customer. The travel agent will attemp to gather information from the customer in order to help plan a trip for them" +
            "some information required are the country, date and time of departure, date and time of return, budget, number of people going, and their preferences for activities." +
            "Once you have the required information start buiding the itineray day by day and appending it to the schedule by suggesting activities for customer to do each day " +
            +"once customer is satisfy you can move on to the next day by suggesting new activities" +
            "Only stop once you have a complete itinerary for the customer." +
            `
        interface DailyItinerary {
            day: number
            date: Date
            activities: Activity[]
            }
        interface Activity {
            name: string
            city: string
            description: string
            startTime: Date
            endTime: Date
            cost?: number
            }
            interface Response{
                chatResponse: "string",
                dailyItinerary?: DailyItinerary[]
                information?: {    country: string
                    budget?: number
                numberOfPeople?: number
                preferences?: string[]
            }}
            
        Write the basics section according to the Response schema. leave the field blank if theres no information except for the chatResponseField. always write some response in the chatResponse field.
On the response, include only the JSON.` + JSON.stringify(travelItinerary) +
            + messageHistory + "customer:" + prompt + " Response:"

    }

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
