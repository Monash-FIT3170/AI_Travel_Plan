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
    const travelItineraryString = "current travel itinerary" + JSON.stringify(travelItinerary)
    console.log(messageHistory)
    const returnMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a friendly travel agent that is trying to help the user plan their trip and create an iteinrary for them" + "The following is a converstion between a travel agent and a customer. The travel agent will attemp to gather information from the customer in order to help plan a trip for them" +
            "some information are the country, start date, end date, budget, number of people going, and their preferences for activities." +
            "Once you have all the required information provide a recap of the information make sure customer confirms before continue" +
            "once customer confirms the information start buiding the itineray iteratively from day 1 " +
            + "once customer is satisfy with current day <strictly> return the daily itineray following the dailyItineray schema and move on to the next day by suggesting new activities" +
            "Only stop once you have a complete itinerary for the customer." +
            `
          interface TravelItinerary {
    startDate: Date
    endDate: Date
    country: string
}
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
                travelItinerary?: TravelItinerary,
                dailyItinerary?: DailyItinerary[]
                }
            
        Write the basics section according to the Response schema. Response in the chatResponse field is required do not use any schema in the chatResponse. always end the response with a question to the customer.
        only use the travelItinerary field for the startdate,enddate and country when recapping the information after the customer confirms the information. do not store return dailyItinerary in the travelItinerary field.        
        On the response, include only the JSON.` + travelItineraryString
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
