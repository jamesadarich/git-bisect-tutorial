import { Expect, Test, TestFixture } from "alsatian";
import { square } from "../src/square";

@TestFixture("square tests")
export class SquareTests {
    @Test("four can be squared")
    public async fourCanBeSquared() {
        Expect(() => square(4)).not.toThrow();
    }
}
