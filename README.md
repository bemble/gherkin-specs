# gherkin-specs

[![NPM version][npm-image]][npm-url]

> Generate Javascript implementation (specs) of Gherkin features.

Helper created in complement of [`gherkin-specs-api`](https://github.com/gregorylimoratto/karma-jasmine-feature), to allow you to easilly generate
gherkin-like implementations and use it with any tools that understand such files,
such as [`karma-jasmine-feature`](https://github.com/gregorylimoratto/karma-jasmine-feature) or [`node-gherkin-runner`](https://github.com/gregorylimoratto/node-gherkin-runner).

## Install

```bash
npm install gherkin-specs  -g
```

## Warning

:warning: For now, the tool does not take care about existing spec file, it will overwrite them.

## Run

```bash
gherkin-specs *.feature
```

## Help

```bash
gherkin-specs --help
```

Will output:
```bash
Usage: gherkin-specs [OPTION] [feature files matching glob]
Example: gherkin-specs test/**/*.feature

Options:
  -t, --typescript  generate specs in Typescript
      --es3         generate specs in ES3
  -h, --help        display this help
      --verbose     verbose mode
  -v, --version     show version
```

Or take a look at the [wiki](https://github.com/pierrecle/gherkin-specs/wiki/)

[npm-url]:https://npmjs.org/package/gherkin-specs
[npm-image]:https://badge.fury.io/js/gherkin-specs.svg