/**
 * UniqueNumber
 * 
 * Unique sequential number generator.
 * Useful for IDs.
 */

class UniqueNumber {
    private unique: number;
    constructor() {
        this.unique = 0;
    }
    get next (): number {
        return this.unique++;
    }
}


export = UniqueNumber;
