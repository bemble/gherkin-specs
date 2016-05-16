const Gherkin = require('gherkin');
const fs = require('fs');

class Parser {
  constructor() {
    this.gherkinParser = new Gherkin.Parser(new Gherkin.AstBuilder());
    this.tokenMatcher = new Gherkin.TokenMatcher();
  }
  
  parseFeature(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) return reject(err);
        
        try {
          let tokenScanner = new Gherkin.TokenScanner(data);
          let document = this.gherkinParser.parse(tokenScanner, this.tokenMatcher);
          resolve(document);
        }catch(e) {
          reject(e);
        }
      });
    });
  }
}

module.exports = Parser;