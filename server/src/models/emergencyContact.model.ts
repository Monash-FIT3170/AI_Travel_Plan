/**
 * @openapi
 * components:
 *   schemas:
 *     EmergencyContact:
 *       type: object
 *       required:
 *         - country
 *         - fireNumber
 *         - policeNumber
 *         - ambulanceNumber
 *         - universalNumber
 *       properties:
 *          country:
 *           description: The Country object for each country, name and ISO code and ISO Numeric are provided.
 *           $ref: '#/components/schemas/Country'
 *          fireNumber:
 *           type: string
 *           description: Number for fire services.
 *          policeNumber:
 *           type: string
 *           description: Number for police services.
 *          ambulanceNumber:
 *           type: string
 *           description: Number for ambulance services.
 *          universalNumber:
 *           type: string
 *           description: Number for all services if numbers are the same for all emergency situations such as AU using 000.
 */

export interface EmergencyContact {
    country: Country,
    fireNumber: string,
    policeNumber: string,
    ambulanceNumber: string,
    universalNumber: string,
}


/**
 * @openapi
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - countryName
 *         - countryISOCode
 *         - countryISONumeric
 *       properties:
 *          countryName:
 *           type: string
 *           description: Name of the country.
 *          countryISOCode:
 *           type: string
 *           description: ISO code of the country.
 *          countryISONumeric:
 *           type: string
 *           description: ISO Numeric of the country.
 */
export interface Country {
    countryName: string,
    countryISOCode: string,
    countryISONumeric: string,
}
