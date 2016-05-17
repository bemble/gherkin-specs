const lib = require('./lib');
const SpecElement = require('./lib/SpecElement');
const fs = require('fs');

class GherkinSpecs  {
  constructor() {
    this.parser = new GherkinSpecs.Parser();
    this.docToSpecConverter = new GherkinSpecs.DocumentToSpecConverter();
  }
  
  convertFeature(filePath) {
    let specFilePath = `${filePath}.spec.js`;
    return this.parser.parseFeature(filePath)
      .then((document) => this.docToSpecConverter.convert(document))
      .then((specsElement) => {
        return new Promise((resolve, reject) => {
          let fileContent = `(() => {\n${SpecElement.elementsToString(specsElement)}\n})();`
          fs.writeFile(specFilePath, fileContent, (err) => {
            if(err) return reject(err);
            resolve(specFilePath);
          });
        });
      })
  }
  
  static get Parser() {
    return lib.Parser;
  }
  
  static get DocumentToSpecConverter() {
    return lib.DocumentToSpecConverter;
  }
}

module.exports = GherkinSpecs;