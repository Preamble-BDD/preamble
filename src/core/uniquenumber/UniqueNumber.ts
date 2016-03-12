/**
 * UniqueNumber
 *
 * Unique sequential number generator.
 * Useful for IDs.
 */

import {IUniqueNumber} from "./IUniqueNumber";

export class UniqueNumber implements IUniqueNumber {
    private unique: number;
    constructor() {
        this.unique = 0;
    }
    get next (): number {
        return this.unique++;
    }
}
