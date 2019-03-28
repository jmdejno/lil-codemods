# jquery


## Usage

```
npx lil-codemods jquery path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods jquery path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/jquery/__testfixtures__/basic.input.js)</small>):
```js
this.$();
const container = this.$(courseBodyClassNames.infoTabScrollContainer);
const elem = this.$().find(`#embed-entity-url-${this.get('element.id')}`);
const text = this.$().text().trim();
this.$(reportButton).text().trim();
this.$(reportButton).find().text().trim();
this.$(CoursePage.selectors.transcripts.transcript).length
this.$().is("disabled")
```

**Output** (<small>[basic.output.js](transforms/jquery/__testfixtures__/basic.output.js)</small>):
```js
this.element;
const container = this.element.querySelector(courseBodyClassNames.infoTabScrollContainer);
const elem = this.element.querySelector(`#embed-entity-url-${this.get('element.id')}`);
const text = this.element.textContent.trim();
this.element.querySelector(reportButton).textContent.trim();
this.element.querySelector(reportButton).querySelector().textContent.trim();
this.element.querySelector(CoursePage.selectors.transcripts.transcript).length
this.element.disabled
```
<!--FIXTURES_CONTENT_END-->