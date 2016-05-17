#!/usr/bin/env node

const GherkinSpecs = require(`${__dirname}/../`);
const getOpt = require('node-getopt');

opt = getOpt.create([
  ['t' , 'typescript'         , 'generate specs in Typescript'],
  [''  , 'es3'                , 'generate specs in ES3'],
  [''  , 'no-params-matching' , 'prevent double quotes string to be interpreted as parameters in regexp'],
  ['h' , 'help'               , 'display this help'],
  [''  , 'verbose'            , 'verbose mode'],
  ['v' , 'version'            , 'show version']
])
.bindHelp()
.setHelp(`Usage: gherkin-specs [OPTION] [feature files matching glob]
Example: gherkin-specs test/**/*.feature

Options:
[[OPTIONS]]`
)
.parseSystem();

class Runner {
  constructor(options) {
    this.paramsMatching = !options['no-params-matching'];
    this.verbose = !!options.verbose;
    this.typescript = !!options.typescript;
    this.es3 = !!options.es3;
  }
  
  static showVersion() {
    let packageContent = require(`${__dirname}/../package.json`);
    console.log(`Version: ${packageContent.version}`);
  }
  
  convertFiles(files) {
    return new Promise((resolve, reject) => {
      resolve(files);
    }).then((files) => {
      if(!files.length) return [];
      
      var gherkinSpecs = new GherkinSpecs();
      gherkinSpecs.paramsMatching = this.paramsMatching;
      gherkinSpecs.typescriptOutput = this.typescript;
      gherkinSpecs.es3Output = this.es3;
      
      return files.map((featureFile) => {
        this.log(`Generating specs for ${featureFile}...`)
        gherkinSpecs.convertFeature(featureFile)
          .then((specFile) => this.log(`${specFile} generated.`));
      });
    })
    .then((convertPromises) => Promise.all(convertPromises))
    .catch((err) => console.err(err))
  }
  
  log(message) {
    this.verbose && console.log(message);
  }
}

if(opt.options.version) {
  Runner.showVersion();
}
else {
  let runner = new Runner(opt.options);
  runner.convertFiles(opt.argv);
}