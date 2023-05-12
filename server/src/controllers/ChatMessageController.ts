import { Request, Response } from 'express'
import { sendOpenAIChat } from '../services/OpenAIChat.service'


const postMessageRequest = async (req: Request, res: Response) => {
    try {
        const response = await sendOpenAIChat(req.body)
        const reply = response
        console.log(reply)

        res.status(200).json({ message: response })

    } catch (error) {
        res.status(400).json({ message: error })
    }






}

module.exports = {
    postMessageRequest
}
