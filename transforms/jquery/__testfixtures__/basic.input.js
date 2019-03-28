this.$();
const container = this.$(courseBodyClassNames.infoTabScrollContainer);
const elem = this.$().find(`#embed-entity-url-${this.get('element.id')}`);
const text = this.$().text().trim();
this.$(reportButton).text().trim();
this.$(CoursePage.selectors.transcripts.transcript).length