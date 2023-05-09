import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import dotenv from 'dotenv';
dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// current conceptual structure of a conversation back and forth.
interface History_Item {
    prompt: string,
    reply: string
}


//TODO: refactor to accept ChatHistory instead of History_Item
export async function arenSendResponse(message: string, history: any[]) {
    console.log("jumped in the function")
    //array of messages to be sent to chatgpt
    let messages: ChatCompletionRequestMessage[] = []

    // define chat-bot's role
    const message1: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a travel agent",
    }
    messages.push(message1)

    let completeChat: string = ""
    for (let i = 0; i < history.length; i++) {
        completeChat += history[i].prompt + "\n" + history[i].reply + "\n"
    }
    completeChat += message 

    // provide context to ChatGPT
    let tempMessage: ChatCompletionRequestMessage = {
        role: "user", 
        content: completeChat
    }
    messages.push(tempMessage)


    // provide chat-bot with user request
    const message2: ChatCompletionRequestMessage = {
        role: "user",
        content: message,
    }
    messages.push(message2)
    
    
    // specify format of the response
    const message3: ChatCompletionRequestMessage = {
        role: "system",
        content: "return your full response in {places: [place:str, date:date, cost:number, description:str, address;str], chatResponse: string } json format with no additional text. Provide the agent response in the specified chatResponse field where the agent response is a summary of the places you've suggested. make sure you don't suggest places again that are given in earlier messages. If recommending multiple places, separate the places into different items in the array of places, but make sure there is only ever one chatresponse. Also compile all suggestions into the places array",
    }
    messages.push(message3)

    console.log(messages)
    const completion = await openai.createChatCompletion(
        {
            "model": "gpt-3.5-turbo",
            "messages": messages
        }
    )
    console.log(completion.data.choices[0].message?.content)
    //return await completion.data.choices[0].message?.content

}