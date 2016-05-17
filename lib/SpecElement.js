class SpecElement {
  constructor(gherkinKeyword, matchingStr) {
    this.gherkinKeyword = gherkinKeyword;
    this.matchingStr = matchingStr;
    
    let regexpStr = SpecElement.sanitizeRegExpStr(this.matchingStr);
    this.regexp = new RegExp(`^${regexpStr}$`);
    
    this.es3Output = false;
    this.tsOutput = false;
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
      return elt.gherkinKeyword === newSpecElement.gherkinKeyword && elt.regexp.test(newSpecElement.matchingStr);
    });
  }
  
  tsCallbackString() {
    return `() => {}`;
  }
  
  es2015CallbackString() {
    return `() => {}`;
  }
  
  es3CallbackString() {
    return `function () { }`;
  }
  
  callbackString() {
    if(!this.hasCallback) return '';
    
    let callbackStringFunctionName = 'es2015';
    if(this.tsOutput) {
      callbackStringFunctionName = 'ts';
    }
    else if(this.es3Output) {
      callbackStringFunctionName = 'es3';
    }
    callbackStringFunctionName += 'CallbackString';
    return ', ' + this[callbackStringFunctionName]();
  }
  
  toString() {
    return `${this.type}(${this.regexp}${this.callbackString()})`;
  }
}

module.exports = SpecElement;