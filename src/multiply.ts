// commit 33 
// commit 32 
// commit 31 
// commit 30 
// commit 29 
// commit 28 
// commit 27 
// commit 26 
// commit 25 
// commit 24 
// commit 23 
// commit 22 
// commit 21 
// commit 20 
// commit 19 
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
