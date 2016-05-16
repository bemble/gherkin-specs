class SpecElement {
  constructor(gherkinKeyword, matchingStr) {
    this.gherkinKeyword = gherkinKeyword;
    let regexpStr = SpecElement.sanitizeRegExpStr(matchingStr);
    this.regexp = new RegExp(regexpStr);
  }
  
  get type() {
    return SpecElement.getStepType(this.gherkinKeyword);
  }
  
  get hasCallback() {
    return !this.isFeature;
  }
  
  get isFeature() {
    return this.gherkinKeyword === 'feature';
  }
  
  static get gherkinKeywordMapping() {
    return {
      feature: 'featureSteps'
    };
  }
  
  static getStepType(gherkinKeyword) {
    return SpecElement.gherkinKeywordMapping[gherkinKeyword] || gherkinKeyword;
  }
  
  static sanitizeRegExpStr(str) {
    return str.replace(/[\n\r]/g, '\n').replace(/\n\s+/g, '\n').replace(/\n/g, '\\n');
  }
  
  static alreadyPresent(specElements, newSpecElement) {
    return specElements.some((elt) => {
      return elt.gherkinKeyword === newSpecElement.gherkinKeyword && elt.regexp.test(newSpecElement.regexp.toString());
    });
  }
  
  toString() {
    return `${this.type}(${this.regexp}${this.hasCallback ? ', () => {}' : ''})`;
  }
  
  static elementsToString(specElements) {
    return '  ' + specElements.join('\n    .');
  }
}

module.exports = SpecElement;