import { TravelItinerary } from './travelItinerary.model';

/**
 * @openapi
 * components:
 *  schemas:
 *     ChatMessage:
 *      type: object
 *      required:
 *          - message

 */
export interface ChatMessage {
    message: string
    chatHistory: TravelItinerary | String
}
