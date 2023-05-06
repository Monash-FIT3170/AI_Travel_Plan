import { Example } from '../models/example.model';

/**
 * 
 * business logic
 * handling complex operations with other models and components
 */

export function validateExample(example: Example): boolean {
    return example.body.length > 10;
}
