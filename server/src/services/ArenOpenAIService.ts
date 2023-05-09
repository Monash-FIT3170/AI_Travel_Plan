import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(configuration);

interface History_Item {
    prompt: string,
    reply: string
}

/**
 * @fix this request is hard coded, need to change depending on the user input
 * @param message 
 * @param history history of messages from chatgpt
 * @returns 
 */ 
//TODO: refactor to accept ChatHistory instead of History_Item
export async function arenSendResponse(message: string, history: History_Item[]) {

    //array of messages to be sent to chatgpt
    let messages: ChatCompletionRequestMessage[] = []

    // define chat-bot's role
    const message1: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a travel agent",
    }
    messages.push(message1)

    // provide context to ChatGPT
    for (let i = 0; i < history.length; i++) {
        let tempMessage: ChatCompletionRequestMessage = {
            role: "system", 
            content: `Some context: user asked: " ${history[i].prompt}" and you replied: "${history[i].reply}"`
        }
        messages.push(tempMessage)
    }

    // provide chat-bot with user request
    const message2: ChatCompletionRequestMessage = {
        role: "user",
        content: message,
    }
    messages.push(message2)
    
    
    // specify format of the response
    const message3: ChatCompletionRequestMessage = {
        role: "system",
        content: "return a response in {places: [place:str, date:date, cost:number, description:str, address;str, chatResponse?: string ]} json format with no additional text. Provide the agent response in chatResponse field",
    }
    messages.push(message3)


    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": messages
        }
    )
    //ChatHistory.add
    return await completion.data.choices[0].message?.content

}