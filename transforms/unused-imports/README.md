# unused-imports

Remove unused imports.

## Usage

```
npx lil-codemods unused-imports path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods unused-imports path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/unused-imports/__testfixtures__/basic.input.js)</small>):
```js
import {
  JSCodeshift,
  ObjectProperty,
  ObjectMethod,
  File,
  ASTPath,
  ImportDeclaration
} from "jscodeshift";

import { ASTNode } from "jscodeshift";
import { ASTNode as ASTNode2 } from "jscodeshift";
import { Mappings } from "jscodeshift";

const a = JSCodeshift;

```

**Output** (<small>[basic.output.js](transforms/unused-imports/__testfixtures__/basic.output.js)</small>):
```js
import { JSCodeshift } from "jscodeshift";

const a = JSCodeshift;

```
<!--FIXTURES_CONTENT_END-->