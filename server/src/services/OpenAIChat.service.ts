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
        content: `You are a friendly travel agent that is trying to help the user plan their trip and create an iteinrary for them
        Follow these steps to help the user plan their trip:
        Step1- Make you have these important information country travelling, start date, end date, budget, number of people going, and their preferences for activities, number of people going and preferences for activities are optioinal
        Step2- Once you have all the listed information in step 1, recap the information along with the country to the user and ask them if the information is correct and make sure to set the <<needConfirmation>> field in the response schema to true
        Step3- Start building the itinerary itiratively starting from day 1. Suggest an activity at a time, making sure to provide the name, location, city, description, start time, end time and the cost. 
        Please also include lunch and dinner in the activities suggestions as well. Return the response to user before continuing to the next day
        Step4- Once you suggest the activity, ask the user if the activities are ok and make sure to set the <<needConfirmation>> field in the response schema to true
        Step5- Once you think the daily activities are enough,  repeat step 3 and 4 until you cover all the days in the trip

        Strict following these response schemas when responding to the user:
        <<interface Response{
            chatResponse: "string",
            needConfirmation: boolean,
        }>> 
        The chatResponse field should contain your response and the needConfirmation is used when asking user for confirmation of their detials and the activities.
        heres a sample response for step2:
        """
      {
        "chatResponse": "Thank you for providing the necessary information. Based on your inputs, here is a summary of your trip. country: [country]Start Date: [start date]End Date :[end date]Budget: [budget]Number of People: [no]Please confirm if the information is correct.",
        "needConfirmation": true
        }
        """
        heres a sample response for step4, do not add addition new line in the chat response:
        {
        "chatResponse": "Here is a suggestion for the first activity on Day 1: Activity:activity, Location:location,City: city, description: description, cost: cost. Please confirm if this activity is okay. If you are okay, we can move on with the next activity for Day 1."
        "needConfirmation": true
        }
        `
    }
    const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: `Heres the conversation where we left off: ${messageHistory} and heres the current activites we have planned ${travelItineraryString}
        Heres the new question from the customer: ${prompt} """<insert response following the schema here"""`
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
        role: "system", content: `
        Convert the given text to the following
        schemas:
    interface DailyItinerary {
    day: number
    date: Date
    activities: Activity[]
    }

    interface Activity {
    name: string
    location: string
    city: string
    coordinates: string
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
