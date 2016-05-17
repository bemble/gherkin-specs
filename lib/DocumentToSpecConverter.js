const S = require('string');
const SpecElement = require('./SpecElement');

class DocumentToSpecConverter {
  constructor() {
    this.matchesParams = true;
  }
  
  convert(document) {
    let specElements = [];
    let feature = document.feature;
    
    let featureKeyword = DocumentToSpecConverter.sanitizeKeyword(feature.keyword);
    let featureMatchinExpression = `${feature.name}${feature.description ? `\n${feature.description}` : ''}`;
    specElements.push(new SpecElement(featureKeyword, featureMatchinExpression, this.matchesParams));
    
    feature.children.forEach((child) => {
      if(!child.steps) return;
  
      let previousKeyword = null;
      for(let i = 0; i < child.steps.length; i++) {
        let step = child.steps[i];
        let keyword = DocumentToSpecConverter.sanitizeKeyword(step.keyword);
        keyword = keyword === "and" ? previousKeyword : keyword;
        
        let specElement = new SpecElement(keyword, step.text, this.matchesParams);
        
        if(!SpecElement.alreadyPresent(specElements, specElement)) {
          specElements.push(specElement);
        }
        
        previousKeyword = keyword;
      }
    });
    
    return specElements;
  }
  
  static sanitizeKeyword(keyword) {
    return S(keyword).trim().slugify().camelize().s;
  }
}

module.exports = DocumentToSpecConverter;