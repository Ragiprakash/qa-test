const debug = process.env.DEBUG;
const timeout = debug ? 999999999 : 400000;
let logLevel = 'silent';
global.BASE_URL = "https://www.bbc.co.uk/";

exports.config = {
  specs: [
      'test/specs/bbcTest.js'
  ],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 3,
    browserName: 'chrome'
  }],
  logLevel: logLevel,
  sync: true,
  coloredLogs: true,
  deprecationWarnings: false,
  bail: 0,
  debug,
  execArgv: debug && ['--inspect'],
  baseUrl: BASE_URL,
  waitForTimeout: 60000,
  twentySeconds: 20000,
  fiveSeconds: 5000,
  twoSeconds: 2000,
  threeSeconds: 3000,
  waitForExist: 60000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout,
  },

  beforeTest: function () {
    const chai = require('chai')
    const chaiwebdriver = require('chai-webdriverio').default
    chai.use(chaiwebdriver(browser))
    global.assert = chai.assert
    global.should = chai.should
    global.expect = chai.expect
  },
};
