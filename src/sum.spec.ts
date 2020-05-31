import { Expect, Test, TestFixture } from "alsatian";
import { sum } from "./sum";

@TestFixture("sum tests")
export class SumTests {

    @Test("two values are summed")
    public twoValuesAreSummed() {
        Expect(sum(2, 2)).toBe(4);
    }
}
