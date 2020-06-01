import { Expect, Test, TestFixture } from "alsatian";
import { square } from "./square";

@TestFixture("square tests")
export class SquareTests {

    @Test("value is squared")
    public twoValuesAreMultiplied() {
        Expect(square(2)).toBe(4);
    }
}
