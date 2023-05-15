/**
 * @openapi
 * components:
 *  schemas:
 *     ChatHistoryItem:
 *      type: object
 *      required:
 *          - prompt
 *          - reply
 *      properties:
 *         prompt:
 *          type: string
 *          description: prompt given to openAI completion request
 *          default: 'What is the best place to visit in Tokyo?'
 *         reply:
 *          type: string
 *          description: openAI's response to the prompt
 *          default: 'Ueno Park, Tokyo'
 */

export interface ChatHistoryItem {
    prompt: string,
    reply: string
}