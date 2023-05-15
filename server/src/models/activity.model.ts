/**
 * @openapi
 * components:
 *  schemas:
 *     Activity:
 *      type: object
 *      required:
 *          - name
 *          - location
 *          - startTime
 *          - endTime
 *      properties:
 *         name:
 *          type: string
 *          default: 'Ueno Park, Tokyo'
 *          description: Name of the place to visit
 *         location:
 *          type: string
 *          default: '110-0007 Tokyo Ueno Park, Taito-ku, 5-20'
 *          description: Address of the place to visit
 *         description:
 *          type: string
 *          default: 'The Ueno park is officially called the “Ueno Imperial Gift Park “ because it was a gift from Emperor Taisho to Tokyo city as a place of public recreation. The park is rich with greenery and birds during winter. This park also includes many other attractions in it.'
 *          description: Description of the place to visit
 *         startTime:
 *          type: string
 *          format: date-time
 *          default: '2023-05-26T13:00:00.000Z'
 *          description: Start time of the event 
 * 
 * 
 * 

 */
export interface Activity {
    name: string
    location: string
    description?: string
    startTime: Date
    endTime: Date
    cost?: number
}