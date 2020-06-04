# Git Bisect Tutorial

Git Bisect is a great tool to find the source of an issue in large code bases with frequent commits. It performs a binary search between known working and non-working versions to find the commit that introduced a bug.

## Manual Git Bisect

Let's try it out, first we need to write a test to determine the bug.

Add the following to a new file e.g. `bisect.spec.ts` - it's important this is a new file in a tree that isn't used in your history as git is going to start changing commits soon so if a conflict occurs this is going to break.

```typescript
import { Expect, Test, TestFixture } from "alsatian";
import { square } from "../src/square";

@TestFixture("bisect tests")
export class BisectTests {    
    @Test("multiplying the same numbers has the same result")
    public twoValuesAlwaysSame() {
        Expect(multiply(2, 2)).toBe(multiply(2, 2));
    }
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

Let's try another commit range as now we have a bug to track down in `src/square.ts`. So let's write the following test.

```typescript
import { Expect, Test, TestFixture } from "alsatian";
import { square } from "../src/square";

@TestFixture("bisect tests")
export class BisectTests {
    @Test("four can be squared")
    public async fourCanBeSquared() {
        Expect(() => square(4)).not.toThrow();
    }
}
```

and start off the bisect

```
git bisect start
git bisect bad
git bisect good b31bd4f6f203f012430bbff0edab37b47a4f2fde
git bisect run npm test
```

Bad news is this incorrectly identifies commit `cff93612677abc9c18fc8860be09a30b4e94d8dc` as the offending commit but we can see that this has no changes involving `src/square.ts`. This is because the test doesn't compile due to the source file being missing and sends an error code which git bisect interprets as bad. 

In the case we don't know what the outcome is of a bisect we can pass `git bisect skip`. But as we're using a script how do we achieve this? Simply exit with code 125 will indicate the result is unknown.

The following bash script will skip commits where the source file is missing.

```bash
#!/bin/bash

set -e

SOURCE_FILE="./src/square.ts"

if test -f "$SOURCE_FILE"; then
    echo "found"
    npx alsatian ./bisect.spec.ts
else
    echo "not found"
    exit 125
fi
```

Great a different commit but bad news it's still the wrong one. This time it selects `848c4c923f54067ab446b9a41371cd6d43bfa337` as this commit does not compile. As this code would never have been released we can assume that commits that don't compile should also not be marked as bad.

We update the script....

```bash
#!/bin/bash

set -e

TESTFILE="./src/square.ts"

if npx tsc; then
    if test -f "$TESTFILE"; then
        echo "found"
        npx alsatian ./bisect.spec.ts
    else
        echo "not found"
        exit 125
    fi
else
    echo "bad commit - doesn't compile"
    exit 125
fi
```

... and run the bisect again.

two commits - bug commit is next to bad can't compile commit

#### Squash commits

If it's still not clear and the commit selected is a squash of a large change you can always restore that branch and bisect again on that branch :)
