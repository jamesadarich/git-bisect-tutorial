// commit 5 
// commit 4 
// commit 3 
import { sum } from "./sum";

let total = 0;

export function multiply(x: number, y: number) {

    for (let i = 0; i < y; i++) {
        total = sum(x, total);
    }

    return total;
}
