import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
import {ChatHistoryItem} from '../models/chatHistoryItem.model'
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
export async function arenSendResponse(message: string, history: ChatHistoryItem[]) {
    //array of messages to be sent to chatgpt
    let messages: ChatCompletionRequestMessage[] = []

    // define chat-bot's role
    const message1: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a travel agent",
    }
    messages.push(message1)

    // create string with chat history separated by newline characters
    let completeChat: string = ""
    for (let i = 0; i < history.length; i++) {
        completeChat += history[i].prompt + "\n" + history[i].reply + "\n"
    }
    completeChat += message // append the actual prompt 

    // provide context and prompt to ChatGPT
    let tempMessage: ChatCompletionRequestMessage = {
        role: "user", 
        content: completeChat
    }
    messages.push(tempMessage)
    
    // specify format of the response and define any additional rules
    const message3: ChatCompletionRequestMessage = {
        role: "system",
        content: `return your full response in 
            {
                places: 
                    [place:str, date:date, cost:number, description:str, address;str], 
                chatResponse: string 
            } 
            json format with no additional text. 
            Provide the agent response in the specified chatResponse field where the agent response is a summary of the places you've suggested. 
            make sure you don't suggest places again that are given in earlier messages. 
            If recommending multiple places, separate the places into different items in the array of places, but make sure there is only ever one chatresponse. 
            Also compile all suggestions into the places array`,
    }
    messages.push(message3)

    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": messages
        }
    )

    return await completion.data.choices[0].message?.content
}