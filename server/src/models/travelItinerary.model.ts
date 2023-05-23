import { DailyItinerary } from "./dailyitinerary.model"
/**
 * @openapi
 * components:
 *   schemas:
 *     TravelItinerary:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *       properties:
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the travel itinerary in "YYYY-MM-DD" format.
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the travel itinerary in "YYYY-MM-DD" format.
 *         schedule:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DailyItinerary'
 *           description: An array of daily itinerary objects.
 */

export interface TravelItinerary {
    startDate: Date
    endDate: Date
    schedule?: DailyItinerary[]
}