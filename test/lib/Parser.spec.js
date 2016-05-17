const Parser = require(`${__dirname}/../../lib`).Parser;

describe('Parser', () => {
  var parser = null;
  
  before(() => {
    parser = new Parser();
  });
  
  describe('parseFeature', () => {
    it('returns a rejected promise if any error', (done) => {
      parser.parseFeature(`/does/not/exists`)
      .then(() => 'Promise not rejected')
      .catch(() => null)
      .then(done, done);
    });
    
    it('returns a promise resolved with the gherkin document', (done) => {
      parser.parseFeature(`${__dirname}/../features/test1.feature`)
      .then((document) =>{
        assert(document, 'feature is empty');
        assert.equal(document.type, 'GherkinDocument');
      })
      .then(done, done);
    });
  });
});