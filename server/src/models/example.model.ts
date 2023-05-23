/**
 * define the data structure
 * 
 */

/**
 * @openapi
 * components:
 *  schemas:
 *     Example:
 *      type: object
 *      required:
 *          - body
 *      properties:
 *         body:
 *          type: string
 *          default: Example body
 *          description: Example body
 * 
 */
export interface Example {
    body: string
}