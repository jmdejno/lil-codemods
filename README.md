# lil-codemods
[![npm version](https://badge.fury.io/js/lil-codemods.svg)](https://badge.fury.io/js/lil-codemods)

A collection of codemods for Ember.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx lil-codemods run

# or

yarn global add lil-codemods
lil-codemods run
```

## Transforms

<!--TRANSFORMS_START-->
* [component-property-ordering](transforms/component-property-ordering/README.md)
* [get](transforms/get/README.md)
* [get-properties](transforms/get-properties/README.md)
* [jquery](transforms/jquery/README.md)
* [set](transforms/set/README.md)
* [set-properties](transforms/set-properties/README.md)
* [unused-imports](transforms/unused-imports/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`