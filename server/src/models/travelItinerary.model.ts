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
 *         country:
 *           type: string
 *           description: The country of the travel itinerary.
 *         budget:
 *           type: number
 *           description: The budget of the trip.
 *         numberOfPeople:
 *           type: number
 *           description: The number of people going on the trip.
 *         schedule:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DailyItinerary'
 *           description: An array of daily itinerary objects.
 */

export interface TravelItinerary {
    startDate: Date
    endDate: Date
    country: string
    budget?: number
    numberOfPeople?: number
    preferences?: string[]
    schedule?: DailyItinerary[]
    longitude: number
    latitude: number
}