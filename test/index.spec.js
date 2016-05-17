const GherkinSpecs = require('../');
const fs = require('fs');

describe('GherkinSpecs', () => {
  it('gives access to Parser and DocumentToSpecConverter', () => {
    assert(GherkinSpecs.Parser, 'Parser not exported');
    assert(GherkinSpecs.DocumentToSpecConverter, 'DocumentToSpecConverter not exported');
  });
  
  describe('convertFeature', () => {
    var gherkinSpecs = null;
    before(() => {
      gherkinSpecs = new GherkinSpecs();
    });
    
    afterEach((done) => {
      fs.unlink(`${__dirname}/features/test1.feature.spec.js`, (err) => done(err));
    });
    
    it('returns a promise with the spec file path', (done) => {
      gherkinSpecs.convertFeature(`${__dirname}/features/test1.feature`)
        .then((specFilePath) => assert.equal(specFilePath, `${__dirname}/features/test1.feature.spec.js`))
        .then(done, done);
    });
    
    it('write the specs into a feature.spec.js file, with the same name, along the feature file', (done) => {
      gherkinSpecs.convertFeature(`${__dirname}/features/test1.feature`)
        .then(() => fs.accessSync(`${__dirname}/features/test1.feature.spec.js`, fs.R_OK))
        .then(done, done);
    });
    
    it('convert feature to specs', (done) => {
      gherkinSpecs.convertFeature(`${__dirname}/features/test1.feature`)
        .then(() => {
          let expectedSpecsContent = fs.readFileSync(`${__dirname}/features/expect-test1.feature.spec.js`, 'utf8');
          let specsContent = fs.readFileSync(`${__dirname}/features/test1.feature.spec.js`, 'utf8');
          assert.equal(specsContent, expectedSpecsContent);
        })
        .then(done, done);
    });
  });
});