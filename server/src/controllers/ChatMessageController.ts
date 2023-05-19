import { Request, Response } from 'express'
import { sendOpenAIChat } from '../services/OpenAIChat.service'
import { TravelItinerary } from '../models/travelItinerary.model'
import { mockTravelItinerary1 } from '../MockItinerary'
import { ChatResponse } from '../models/chatResponse.model'
import { parse } from 'path'

//for mock data testing only
const getMockResponse = (req: Request, res: Response) => (res.status(200).json({ travelItinerary: mockTravelItinerary1, chatResponse: "mock response" }))



const postMessageRequest = async (req: Request, res: Response) => {


    try {

        const response = await sendOpenAIChat(req.body)
        const reply = response[0].message?.content
        const parsedResponse: ChatResponse = reply ? parseResponse(reply) : { chatResponse: "error" }
        //need to parse
        console.log(parsedResponse)
        res.status(201).json(parsedResponse)

    } catch (error) {
        res.status(400).json({ message: error })
    }

}

function parseResponse(response: string): ChatResponse {
    //parse response to json

    const startIndex = response.indexOf('{')
    const endIndex = response.lastIndexOf('}')
    if (startIndex === -1 || endIndex === -1) {
        return { chatResponse: response }
    }

    const jsonString = response.substring(startIndex, endIndex + 1);
    const other = response.substring(0, startIndex) + response.substring(endIndex + 1)
    const json = JSON.parse(jsonString)
    return { travelItinerary: json, chatResponse: other }
}


module.exports = {
    postMessageRequest,
    getMockResponse
}
