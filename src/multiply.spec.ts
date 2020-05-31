import { Expect, Test, TestFixture } from "alsatian";
import { multiply } from "./multiply";

@TestFixture("multiply tests")
export class MultiplyTests {

    @Test("two values are multiplied")
    public twoValuesAreMultiplied() {
        Expect(multiply(2, 2)).toBe(4);
    }
}
