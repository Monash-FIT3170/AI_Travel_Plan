import { Request, Response } from 'express'
import { sendOpenAIChat, textToJSON } from '../services/OpenAIChat.service'
import { TravelItinerary } from '../models/travelItinerary.model'
import { mockTravelItinerary1 } from '../MockItinerary'
import { ChatResponse } from '../models/chatResponse.model'

//for mock data testing only
const getMockResponse = (req: Request, res: Response) => (res.status(200).json(mockTravelItinerary1))



const postMessageRequest = async (req: Request, res: Response) => {


    try {
        console.log(req.body)
        const response = await sendOpenAIChat(req.body)
        const reply = response[0].message?.content
        console.log(reply)
        const parsedResponse: ChatResponse = reply ? parseResponse(reply) : { chatResponse: "error" }
        // const res = reply ? JSON.parse(reply) : {}
        //need to parse
        console.log(parsedResponse)


        res.status(201).json(parsedResponse)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }

}

const convertToStructuredResponse = async (req: Request, res: Response) => {
    console.log(req.body)

    const text = req.body.text as string
    const travelItinerary = req.body.travelItinerary as TravelItinerary
    console.log(travelItinerary)
    try {
        const response = await textToJSON(text, travelItinerary)
        const reply = response[0].message?.content
        console.log(reply)
        const parsedResponse: ChatResponse = reply ? parseResponse(reply) : { chatResponse: "error" }

        console.log(parsedResponse)
        res.status(201).json(parsedResponse)
    } catch (error) {
        console.log(error)
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

    // const findString = response.indexOf('```')
    // const endString = response.lastIndexOf('`')
    const other = response.substring(0, startIndex) + response.substring(endIndex + 1)
    const json = JSON.parse(jsonString) as ChatResponse

    console.log("json converstion" + json)
    console.log("no structured" + other)
    return json
}


module.exports = {
    postMessageRequest,
    getMockResponse,
    convertToStructuredResponse
}
