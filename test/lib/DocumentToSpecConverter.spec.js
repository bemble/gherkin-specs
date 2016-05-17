const Parser = require(`${__dirname}/../../lib`).Parser;
const DocumentToSpecConverter = require(`${__dirname}/../../lib`).DocumentToSpecConverter;


describe('DocumentToSpecConverter', () => {
  var parser = null;
  var converter = null;
  
  before(() => {
    parser = new Parser();
    converter = new DocumentToSpecConverter();
  });
  
  describe('convert', () => {
    it('returns an array', (done) => {
      parser.parseFeature(`${__dirname}/../features/test1.feature`)
      .then((document) => converter.convert(document))
      .then((specElements) => assert(specElements instanceof Array, 'Not an array'))
      .then(done, done);
    });
    
    describe('handles keyword', () => {
      it('handle feature', (done) => {
        parser.parseFeature(`${__dirname}/../features/test1.feature`)
        .then((document) => converter.convert(document))
        .then((specElements) => {
          assert(specElements[0].isFeature, 'Not recognized as a feature');
          assert.equal(specElements[0].type, 'featureSteps');
          assert.deepEqual(specElements[0].regexp, /^Multiple site support\nAs a Mephisto site owner\nI want to host blogs for different people\nIn order to make gigantic piles of money$/);
          assert(!specElements[0].hasCallback, 'Feature does not have callback'); 
      })
        .then(done, done);
      });
      
      it('handle feature without description', (done) => {
        parser.parseFeature(`${__dirname}/../features/test-without-description.feature`)
        .then((document) => converter.convert(document))
        .then((specElements) => assert.deepEqual(specElements[0].regexp, /^Multiple site support$/))
        .then(done, done);
      });
      
      it('handle given', (done) => {
        parser.parseFeature(`${__dirname}/../features/test1.feature`)
        .then((document) => converter.convert(document))
        .then((specElements) => {
          assert.equal(specElements[1].type, 'given');
          assert.deepEqual(specElements[1].regexp, /^a global administrator named "Greg"$/);
          assert(specElements[1].hasCallback, 'Given has callback'); 
      })
        .then(done, done);
      });
      
      it('handle when', (done) => {
        parser.parseFeature(`${__dirname}/../features/test1.feature`)
        .then((document) => converter.convert(document))
        .then((specElements) => {
          assert.equal(specElements[6].type, 'when');
          assert.deepEqual(specElements[6].regexp, /^I try to post to "Expensive Therapy"$/);
          assert(specElements[6].hasCallback, 'when has callback'); 
      })
        .then(done, done);
      });
      
      it('handle then', (done) => {
        parser.parseFeature(`${__dirname}/../features/test1.feature`)
        .then((document) => converter.convert(document))
        .then((specElements) => {
          assert.equal(specElements[7].type, 'then');
          assert.deepEqual(specElements[7].regexp, /^I should see "Your article was published."$/);
          assert(specElements[7].hasCallback, 'when has callback'); 
      })
        .then(done, done);
      });
      
      it('handle and', (done) => {
        parser.parseFeature(`${__dirname}/../features/test1.feature`)
        .then((document) => converter.convert(document))
        .then((specElements) => {
          assert.equal(specElements[2].type, 'given');
          assert.deepEqual(specElements[2].regexp, /^a blog named "Greg's anti-tax rants"$/);
          assert(specElements[2].hasCallback, 'when has callback'); 
      })
        .then(done, done);
      });
    });
    
    it('does not add same step twice', (done) => {
      parser.parseFeature(`${__dirname}/../features/test1.feature`)
      .then((document) => converter.convert(document))
      .then((specElements) => {
        assert.equal(specElements.length, 12);
      })
      .then(done, done);
    });
  });
});