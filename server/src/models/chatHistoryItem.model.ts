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
 *         reply:
 *          type: string
 *          description: openAI's response to the prompt
 */

export interface ChatHistoryItem {
    prompt: string,
    reply: any // TODO: define this structure later. anything for now
}