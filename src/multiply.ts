// commit 70 
// commit 69 
// commit 68 
// commit 67 
// commit 66 
// commit 65 
// commit 64 
// commit 63 
// commit 62 
// commit 61 
// commit 60 
// commit 59 
// commit 58 
// commit 57 
// commit 56 
// commit 55 
// commit 54 
// commit 53 
// commit 52 
// commit 51 
// commit 50 
// commit 49 
// commit 48 
// commit 47 
// commit 46 
// commit 45 
// commit 44 
// commit 43 
// commit 42 
// commit 41 
// commit 40 
// commit 39 
// commit 38 
// commit 37 
// commit 36 
// commit 35 
// commit 34 
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
