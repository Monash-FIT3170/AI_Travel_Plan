import { Request, Response } from 'express'
import { sendOpenAIChat } from '../services/OpenAIChat.service'
import { mockTravelItinerary1 } from '../MockItinerary'
import { ChatResponse } from '../models/chatResponse.model'

//for mock data testing only
const getMockResponse = (req: Request, res: Response) => (res.status(200).json({ travelItinerary: mockTravelItinerary1, chatResponse: "mock response" }))



const postMessageRequest = async (req: Request, res: Response) => {


    const response = await sendOpenAIChat(req.body)
    const reply = response[0].message?.content
    console.log(reply)
    const parsedResponse: ChatResponse = reply ? parseResponse(reply) : { chatResponse: "error" }
    //need to parse
    console.log(parsedResponse)
    res.status(201).json(parsedResponse)



}

function parseResponse(response: string): ChatResponse {
    //parse response to json

    const startIndex = response.indexOf('{')
    const endIndex = response.lastIndexOf('}')
    if (startIndex === -1 || endIndex === -1) {
        return { chatResponse: response }
    }



    const jsonString = response.substring(startIndex, endIndex + 1);

    const findString = response.indexOf('```')
    const endString = response.lastIndexOf('`')
    const other = response.substring(0, startIndex < findString ? startIndex : findString) + response.substring(endIndex > endString ? endIndex + 1 : endString + 1)
    const json = JSON.parse(jsonString)
    console.log(json)
    console.log(other)
    return { travelItinerary: json, chatResponse: other }
}


module.exports = {
    postMessageRequest,
    getMockResponse
}
