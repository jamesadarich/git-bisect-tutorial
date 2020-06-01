# Git Bisect Tutorial

Git Bisect is a great tool to find the source of an issue in large code bases with frequent commits. It performs a binary search between known working and non-working versions to find the commit that introduced a bug.

## Manual Git Bisect

Let's try it out, first we need to write a test to determine the bug.

Add the following to `src/multiply.spec.ts`

```typescript
@Test("multiplying the same numbers has the same result")
public twoValuesAlwaysSame() {
    Expect(multiply(2, 2)).toBe(multiply(2, 2));
}
```

Now running `npm test` will show the issue.

Now we start the Bisect session using `git bisect start`.

Then we need to select the good and bad versions.

In this case we're selecting the current verison as bad using `git bisect bad HEAD`.

Then we know that this bug wasn't here from the start so we're going to select the first commit using `git rev-list --max-parents=0 HEAD` and put this commit id into `git bisect good`.

Now each step bisect performs we run `npm test` and if it fails we send `git bisect bad` and if it doesn't we send `git bisect good`

After around 10 steps the offending commit will be displayed in the console. Hooray we found it!

## Automating Git Bisect

Now as engineers we hate manual stuff so how about we automate this thing!

Good news this is super easy, just start up the same using `git bisect start` and select the range of commits.

Then let it do it's thing with `git bisect run npm test`

### Handling invalid commits

In an ideal world every single commit in your repository will compile and run tests perfectly but perhaps:

* you merge pull requests and an intermediate bad commit gets introduced
* your CI has a gap in coverage and let's a bad commit in
* you don't know or don't have the time to figure out which commit a piece of functionality was introduced

#### Detecting feature not there / bad compile commit

Exit code 125?

b31bd4f6f203f012430bbff0edab37b47a4f2fde

import { Expect, Test, TestFixture } from "alsatian";

@TestFixture("square tests")
export class SquareTests {
    @Test("four can be squared")
    public async fourCanBeSquared() {
        let square: (x: number) => number;
        try {            
            square = require("./square");
        }
        catch (error) {
            process.exit(125);
            return;
        }

        Expect(() => square(4)).not.toThrow();
    }
}

    @Test("four can be squared")
    public fourCanBeSquared() {
        Expect(() => square(4)).not.toThrow();
    }

    cff93612677abc9c18fc8860be09a30b4e94d8dc

#### Squash commits

Bug is in squashed commit


1 - function not there
2 - function not there
3 - bad compile
4 - function not there
5 - function not there
6 - function here
8 - bad compile
7 - bug from PR
9 - bug still here
