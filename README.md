# lil-codemods


A collection of codemod's for lil-codemods.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx lil-codemods run [TRANSFORM NAME] path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods run [TRANSFORM NAME] path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [component-property-ordering](transforms/component-property-ordering/README.md)
* [get](transforms/get/README.md)
* [get-properties](transforms/get-properties/README.md)
* [set](transforms/set/README.md)
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