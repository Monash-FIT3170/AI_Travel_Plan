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
    const messageLast5 = chatHistory?.slice(1).slice(-5)
    const messageHistory = messageLast5?.reduce((acc, cur) => acc + `Customer: ${cur.prompt}\n Agent: ${cur.reply}}`, "")
    const travelItineraryString = "current travel itinerary" + JSON.stringify(travelItinerary)
    const returnMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: `You are a friendly travel agent that is trying to help the user plan their trip and create an itinerary for them.
        The user will provide the country, start date and end date of their trip and their budget
        Here are a few scenarios that you need to handle:
        Scenarios1- recieved the travel information from the user.
        To Do: if the travel information provided is different from what you have, provide a summary of the given information and give a brief introduction to the location and ask if customers are ready to start building the itinerary. If you already have the information skip this case and go to scenarios2
        
        Scenarios2-Customer has confirmed the travel information and you are ready to start building the itinerary.
        TO do: Start building the itinerary itiratively starting from day 1. Suggest max 2 activities for a given response including the lunch and dinner, making sure to provide the name, location, address, city, description, starting time, ending time and the cost. Please also include lunch and dinner as part of the suggested activties and take the budget into consideration as well.
        Make sure the suggested activites are within a resonable travel distance and also take into account of previous day activities location and make a resonable place suggestion
        Once you suggest the activities, ask the user if the activities suggested are ok and make sure to set the <<needConfirmation>> field in the response schema to true
        Scenarios3- you are in the middle of building the itinerary and the user has confirmed the activities suggested.
        To do: Make sure the current day itinerary looks complete, if its not continue building like in scenarios2. If the current day itinerary looks complete, move on to next day


        Strict following these response schemas when responding to the user:
        <<interface Response{
            chatResponse: "string",
            needConfirmation: boolean,
        }>> 
        
        heres a sample response for scanrios2 make sure the chatResponse is in valid json format and do not follow follow the ormat provided by the customer:
        """
        {
        "chatResponse": "Here are a few suggestion for for activities on Day 1. First activites(9am to 10 am) is Location is <location>,Address is <address>,City is <city>, description is <description>, cost is <cost> other activites. . Please confirm if day schedule is okay. If you are okay, we can move on with your schedule.",
        "needConfirmation": true
        }
        """
        Only return one response of a given scenario at a time. Do not return multiple responses for a given scenario.
        `
    }
    const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: `heres the current activites we have planned ${travelItineraryString}. Heres the conversation where we left off: ${messageHistory} and Heres the new question from the customer: ${prompt} """<insert response in a valid json format following the schema here"""`
    }
    messages.push(returnMessage, userMessage)
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

    const startDateStr = startDate ? "starting date is " + startDate : ""
    const endDateStr = endDate ? "ending date is " + endDate : ""
    const countryStr = country ? "country is " + country : ""
    const returnMessage: ChatCompletionRequestMessage = {
        role: "system", content: `firstly, find the approximate longitude and latitude of the location by geocoding the address.
        then, convert the given text to the following schemas, while also including the longitude and latitude in the longitude and latitude placeholders in the follwing format
        also ensure the longitude is between -180 and +180, and latitude is between -90 and 90:
    interface DailyItinerary {
    day: number
    date: Date
    activities: Activity[]
    }

    interface Activity {
    name: string
    location: string
    city: string
    address: string
    longitude: string
    latitude: string
    description?: string
    startTime: Date
    endTime: Date
    cost?: number
    }

    interface TravelItinerary {
    startDate: Date
    endDate: Date
    country: string
    }
    
    There are 2 cases when converting the text to the schemas above:
    case 1: If theres no start date, end date or country provided in the current itinerary, attempt to convert the text into travel itinerary schema
    case 2: if there sufficient information provided such as start date, end date and country, attempt to convert the text into daily itinerary schema
    only return one of the schema from one of the case at a time
    sample response for case 1:
    """
    {
  "startDate": "2023-08-28",
  "endDate": "2023-08-31",
  "country": "Korea",
  "budget": 5
    }
    """
    sample response for case 2:
    """{
    "day": number
    "date": Date
    "activities": Activity[]
    }"""

    Also ensure the coordinates are given to the best of your ability. If there are no coordinates for that place, 
    leave it blank. same goes for the address. if there is no address, leave that blank. But i expect coordinates if there is an address.
    `}
    const textMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: `Heres some detail of the current itinerary ${startDateStr + endDateStr + countryStr}. Convert the following text """${text}""" to the schemas above.
        if you are unable to convert the text to the schemas above, return []
        """<<insert converted data here>>""""`
    }

    console.log(returnMessage, textMessage)
    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": [returnMessage, textMessage]
        }
    )
    return await completion.data.choices
}
