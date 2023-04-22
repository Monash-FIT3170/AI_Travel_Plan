import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(configuration);


/**
 * @fix this request is hard coded, need to change depending on the user input
 * @param message 
 * @returns 
 */
export async function sendResponse(message: string) {

    const messages: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a travel agent",
    }
    const messages1: ChatCompletionRequestMessage = {
        role: "user",
        content: message,
    }
    const messages2: ChatCompletionRequestMessage = {
        role: "system",
        content: "return a response in {place:str, date:date, cost:number, description:str, address;str, chatResponse?: string } json format with no additional text. Provide the agent response in agentresponse field",
    }
    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": [messages, messages1, messages2],
        }
    )
    return await completion.data.choices[0].message?.content

}
