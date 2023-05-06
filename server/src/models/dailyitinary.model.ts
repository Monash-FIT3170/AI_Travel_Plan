import { Event } from './event.model'

/**
 * @openapi
 * components:
 *   schemas:
 *     DailyItinerary:
 *       type: object
 *       required:
 *         - day
 *         - date
 *         - events
 *       properties:
 *         day:
 *           type: integer
 *           description: The day number of the itinerary.
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the itinerary in "YYYY-MM-DD" format.
 *         events:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *           description: An array of event objects for the day.
 */
export interface DailyItinerary {
    day: number
    date: Date
    events: Event[]
}