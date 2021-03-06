# Jest Compact Reporter

Fork of [Sunfit's jest-summary-reporter](https://github.com/sunfit/jest-summary-reporter). Rewritten in [TypeScript](https://www.typescriptlang.org/) with a few additional options.

## Motivation

The default Jest reporter output is sometimes too fancy, especially in environments which doesn't support things such as colours etc. This can make the output difficult to read.

This custom reporter will print a more compact form of the information showing only the failed tests by default.

Additional options are available to customise the output. See [options](#options).

## Examples

### Default

![default-output](images/default.jpg)

### No colours

![default-output](images/no-colours.jpg)

### Show passing tests

With single test

![default-output](images/show-passing-tests.jpg)

With multiple tests

![default-output](images/show-passing-tests-all.jpg)

### No diffs

![default-output](images/no-diffs.jpg)

### Mixed tests

![default-output](images/mixed-failing.jpg)

## Installation

### With NPM

```
npm i -D jest-compact-reporter
```

### With Yarn

```
yarn add jest-compact-reporter -D
```

## Usage

### CLI

```
jest <...args> --reporters jest-compact-reporter
```

### Jest Config

No options

```
// jest.config.js or jest.config.ts
{
  "reporters": ["jest-compact-reporter"]
}
```

With options

```
// jest.config.js or jest.config.ts
{
  "reporters": [
      ["jest-compact-reporter", { diffs: true, colours: true, showPassingTests: false }]
    ]
}
```

## Options

### diffs

Defaults to `true`. If enabled prints Jest's default error explanations for each failing test.

### colours

Defaults to `true`. If enabled adds colours to the output for improved readability. Disable when an environment doesn't support colours.

### showPassingTests

Defaults to `false`. If enabled shows test names of passing tests as well rather than just the suite.

# Contributing

## Requirements

-   Node 12+
-   Jest 20+
-   NPM 6 or Yarn

## Developing

1. Run `npm install` or `yarn install`
2. Run `npm build-and-test` to test changes to the reporter. Note the default `jest.config.ts` has already been setup to use the development reporter.

## License

Unlicense Licence

See [LICENCE.md](https://github.com/aXises/jest-compact-reporter/blob/master/LICENSE.md)
