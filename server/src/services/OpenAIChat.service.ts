import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
import { ChatMessage } from '../models/chatMessage.model';
import { mockTravelItinerary1 } from '../MockItinerary';
import { json } from 'stream/consumers';
import { TravelItinerary } from '../models/travelItinerary.model';
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
    const travelItineraryString = "current travel itinerary" + JSON.stringify(travelItinerary)
    const returnMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a friendly travel agent that is trying to help the user plan their trip and create an iteinrary for them" +
            "The following is a converstion between a travel agent and a customer. The travel agent will attemp to gather information from the customer in order to help plan a trip for them" +
            "some information are the country, start date, end date, budget, number of people going, and their preferences for activities." +
            "Once you have all the required information (start date, end date, country) provide a recap of the information and set NeedConfirmation in the Response field following the Response schema to true before moving on" +
            "once customer confirms the information start buiding the itineray iteratively from day 1. u can include more than 1 activity on each day and make suggest for places to eat as well" +
            "make sure to provide the name, location, city, description, start time, end time and the cost of the activity and be specific on the detail of the activity" +

            "make sure to ask for confirmation with the current day and setNeedConfirmation in the Response field following the Response shema to true before move on" +
            "Only stop once you have a complete itinerary for the customer." +
            `
                interface Response{
                chatResponse: "string",
                needConfirmation: boolean,
                }                
        Write the response according to the Response schema. message in the chatResponse field is required.
        always end the response with a question to the customer. set needConfirmation to true if you need to confirm the information with the customer.
        On the response, include only the JSON.` + travelItineraryString
            + messageHistory + "customer:" + prompt + " Response"

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

export async function textToJSON(text: string, { startDate, endDate, country }: TravelItinerary) {

    const startDateStr = startDate ? "starting date is " + startDate.toISOString().split('T')[0] : ""
    const endDateStr = endDate ? "ending date is " + endDate.toISOString().split('T')[0] : ""
    const countryStr = country ? "country is " + country : ""
    const returnMessage: ChatCompletionRequestMessage = {
        role: "system", content: `Given this TS schemas:
    interface DailyItinerary {
    day: number
    date: Date
    activities: Activity[]
    }

    interface Activity {
    name: string
    location: string
    city: string
    description?: string
    startTime: Date
    endTime: Date
    cost?: number
    }

    interface TravelItinerary {
    startDate: Date
    endDate: Date
    country: string
    budget?: number
    numberOfPeople?: number
    preferences?: string[]
    schedule?: DailyItinerary[]
    }
    Attempt to convert the following text ${text} to the schemas above. ${startDateStr + endDateStr + countryStr}If you are unable to convert the text to the schemas above, return the text as is. Do not return anything else
    `}

    console.log(returnMessage)
    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": [returnMessage]
        }
    )
    return await completion.data.choices
}
