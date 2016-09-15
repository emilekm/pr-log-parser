const chai = require('chai');
const expect = chai.expect;

var utils = require('../lib/utils');

var records = [
    '[2016-04-21 19:01:31] d41d8cd98f00b204e9800998ecf8427e player 192.168.0.1',
    '[2016-04-21 19:01:31] d41d8cd98f00b204e9800998ecf8427e Clan player 192.168.0.1'
];

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

    it('should return object with parsed log record if record and callback are passed(record without clan-tag)', function() {
        expect(utils.parseRecord(records[0], function(err, record) {
            if (err) {
                throw err;
            }
            return record;
        })).to.contain.all.keys(['name', 'time', 'hash', 'ip']);
    });

    it('should return object with parsed log record if record and callback are passed(record with clan-tag)', function() {
        expect(utils.parseRecord(records[1], function(err, record) {
            if (err) {
                throw err;
            }
            return record;
        })).to.contain.all.keys(['name', 'time', 'hash', 'ip', 'tag']);
    });

});
