const chai = require('chai');
const expect = chai.expect;

var utils = require('../lib/utils');

var records = [
    ''
]

describe('utils.parseRecord', function() {
    
    it('should return error if no arguments passed in', function() {
        expect(utils.parseRecord).to.throw(Error, 'No arguments were passed');
    });

    it('should throw error if only callback function is passed', function() {
        expect(function() {
            utils.parseRecord([]);
        }).to.throw(Error, 'Record must be a string');
    });

    it('should return error if only callback is passed', function() {
        expect(function() {
            utils.parseRecord(function(err) {
                if (err) {
                    throw err;
                }
            });
        }).to.throw(Error, 'Record was not passed');
    });

    it('should return array with parsed log records', function() {

    });

});
