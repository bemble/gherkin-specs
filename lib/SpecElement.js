class SpecElement {
  constructor(gherkinKeyword, matchingStr, matchesParams) {
    this.gherkinKeyword = gherkinKeyword;
    this.matchingStr = matchingStr;
    
    this.matchesParams = matchesParams;
    
    let {regexpStr, callbackParams} = this.sanitizeRegExpStr(this.matchingStr);
    this.regexp = new RegExp(`^${regexpStr}$`);
    this.callbackParams = callbackParams;
    
    this.es3Output = false;
    this.typescriptOutput = false;
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
  
  sanitizeRegExpStr() {
    let regexpStr = this.matchingStr.replace(/[\n\r]/g, '\n').replace(/\n\s+/g, '\n').replace(/\n/g, '\\n');
    let callbackParams = [];
      
    if(this.matchesParams) {
      let rawCallbackParams = regexpStr.match(/"([^"]+)"/g);
      if(rawCallbackParams) {
        rawCallbackParams.forEach((paramsStr) => {
          callbackParams.push(`arg${callbackParams.length + 1}`);
          regexpStr = regexpStr.replace(paramsStr, '"([^"]+)"');
        });
      }
    }
    
    return { regexpStr: regexpStr, callbackParams: callbackParams };
  }
  
  static alreadyPresent(specElements, newSpecElement) {
    return specElements.some((elt) => {
      return elt.gherkinKeyword === newSpecElement.gherkinKeyword && elt.regexp.test(newSpecElement.matchingStr);
    });
  }
  
  tsCallbackString() {
    let params = this.callbackParams.map((p) => `${p}:any`);
    return `(${params.join(', ')}) => {}`;
  }
  
  es2015CallbackString() {
    return `(${this.callbackParams.join(', ')}) => {}`;
  }
  
  es3CallbackString() {
    return `function (${this.callbackParams.join(', ')}) { }`;
  }
  
  callbackString() {
    if(!this.hasCallback) return '';
    
    let callbackStringFunctionName = 'es2015';
    if(this.typescriptOutput) {
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