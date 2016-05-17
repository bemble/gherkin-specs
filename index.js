const lib = require('./lib');
const SpecElement = require('./lib/SpecElement');
const fs = require('fs');

class GherkinSpecs  {
  constructor() {
    this.typescriptOutput = false;
    this.es3Output = false;
    this.parser = new GherkinSpecs.Parser();
    this.docToSpecConverter = new GherkinSpecs.DocumentToSpecConverter();
  }
  
  convertFeature(filePath) {
    let specFilePath = this.getSpecFilePath(filePath);
    return this.parser.parseFeature(filePath)
      .then((document) => this.docToSpecConverter.convert(document))
      .then((specElements) => {
        return new Promise((resolve, reject) => {
          let fileContent = this.getSpecFileContent(specElements);
          fs.writeFile(specFilePath, fileContent, (err) => {
            if(err) return reject(err);
            resolve(specFilePath);
          });
        });
      })
  }
  
  getSpecFileContent(specElements) {
    let fileContent = '(';
    fileContent += this.es3Output ? 'function()': '() =>'
    fileContent += ' {\n  ';
    fileContent += specElements.map((specElement) => {
      specElement.typescriptOutput = this.typescriptOutput;
      specElement.es3Output = this.es3Output;
      return specElement.toString();
    }).join('\n    .');
    fileContent += '\n})();'
    return fileContent;
  }
  
  getSpecFilePath(featureFilePath) {
    return`${featureFilePath}.spec.${this.typescriptOutput ? 'ts' : 'js'}`;
  }
  
  static get Parser() {
    return lib.Parser;
  }
  
  static get DocumentToSpecConverter() {
    return lib.DocumentToSpecConverter;
  }
}

module.exports = GherkinSpecs;