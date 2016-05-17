const S = require('string');
const SpecElement = require('./SpecElement');

class DocumentToSpecConverter {
  constructor() {}
  
  convert(document) {
    let specElements = [];
    let feature = document.feature;
    specElements.push(new SpecElement(DocumentToSpecConverter.sanitizeKeyword(feature.keyword), `${feature.name}\n${feature.description}`));
    
    feature.children.forEach((child) => {
      if(!child.steps) return;
  
      let previousKeyword = null;
      for(let i = 0; i < child.steps.length; i++) {
        let step = child.steps[i];
        let keyword = DocumentToSpecConverter.sanitizeKeyword(step.keyword);
        keyword = keyword === "and" ? previousKeyword : keyword;
        
        let specElement = new SpecElement(keyword, step.text);
        
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