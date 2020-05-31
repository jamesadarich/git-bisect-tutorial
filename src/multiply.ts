// commit 18 
// commit 17 
// commit 16 
// commit 15 
// commit 14 
// commit 13 
// commit 12 
// commit 11 
// commit 10 
// commit 9 
// commit 8 
// commit 7 
// commit 6 
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
