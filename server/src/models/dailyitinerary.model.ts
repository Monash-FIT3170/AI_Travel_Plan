import { Activity } from './activity.model'

/**
 * @openapi
 * components:
 *   schemas:
 *     DailyItinerary:
 *       type: object
 *       required:
 *         - day
 *         - date
 *         - activities
 *       properties:
 *         day:
 *           type: integer
 *           description: The day number of the itinerary.
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the itinerary in "YYYY-MM-DD" format.
 *         activities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Activity'
 *           description: An array of event objects for the day.
 */
export interface DailyItinerary {
    day: number
    date: Date
    activities: Activity[]
}
