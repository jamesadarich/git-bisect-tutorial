import { sum } from "./sum";

export function square(x: number) {
    if (x === 4) {
        throw new Error("it's a bug!");
    }

    return x * x;
}