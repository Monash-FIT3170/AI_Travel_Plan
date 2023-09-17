import { ChatHistoryItem } from './chatHistoryItem.model';
import { TravelItinerary } from './travelItinerary.model';

/**
 * @openapi
 * components:
 *  schemas:
 *     ChatMessage:
 *      type: object
 *      required:
 *          - prompt
 *      properties:
 *        prompt:
 *          type: string
 *          description: prompt given to openAI completion request
 *          default: 'What is the best place to visit in Tokyo?'
 *        travelItinerary:
 *          description: The travel itinerary object
 *          $ref: '#/components/schemas/TravelItinerary'
 *        chatHistory:
 *          type: array
 *          description: An array of chat history items   
 *          items:
 *              $ref: '#/components/schemas/ChatHistoryItem'

 * 

 */
export interface ChatMessage {
    prompt: string
    travelItinerary: TravelItinerary
    chatHistory: ChatHistoryItem[]
    additionalInfo: string
}
