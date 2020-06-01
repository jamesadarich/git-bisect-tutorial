# Git Bisect Tutorial

## Manual Git Bisect

Find across 1000 commits

`git bisect bad`
first commit `git rev-list --max-parents=0 HEAD`
`git bisect good`

```typescript
    @Test("multiplying the same numbers has the same result")
    public twoValuesAlwaysSame() {
        Expect(multiply(2, 2)).toBe(multiply(2, 2));
    }
```

## Automating Git Bisect

Connect up using `git bisect run npm test`

### Handling invalid commits

#### Choose commit range

Code not there

#### Detecting feature not there / bad compile commit

Exit code 125?

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
