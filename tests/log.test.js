const chai = require('chai');
const expect = chai.expect;

const LogParser = require('../lib/log.parser');

describe('LogParser', () => {

    it('should return new LogParser instance', () => {
        expect(new LogParser()).to.be.instanceof(LogParser);
    });

    it('should return ', () => {
        expect(new LogParser()).to.be.instanceof(LogParser);
    });

});

describe('Log.LogParser.parse', () => {

    it('should throw error if no arguments passed in', () => {
        expect(() => {
            new LogParser().parse();
        }).to.throw(Error, 'Records buffer was not passed to constructor');
    });

});
