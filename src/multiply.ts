import { sum } from "./sum";

let total = 0;

export function multiply(x: number, y: number) {

    for (let i = 0; i < y; i++) {
        total = sum(x, total);
    }

    return total;
}
