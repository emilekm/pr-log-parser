const chai = require('chai');
const expect = chai.expect;

var utils = require('../lib/utils');

var records = [
    '[2016-04-21 19:01:31] d41d8cd98f00b204e9800998ecf8427e player 192.168.0.1',
    '[2016-04-21 19:02:31] d41d8cd98f00b204e9800998ecf8427e Clan player 192.168.0.1'
];

describe('utils.parseHashRecord', function() {

    it('should return error if no arguments passed in', function() {
        expect(utils.parseHashRecord).to.throw(Error, 'No arguments were passed');
    });

    it('should throw error if only callback function is passed', function() {
        expect(function() {
            utils.parseHashRecord([]);
        }).to.throw(Error, 'Record must be a string');
    });

    it('should return error if only callback is passed', function() {
        expect(function() {
            utils.parseHashRecord(function(err) {
                if (err) {
                    throw err;
                }
            });
        }).to.throw(Error, 'Record was not passed');
    });

    it('should return object with parsed log record if record and callback are passed(record without clan-tag)', function(done) {
        utils.parseHashRecord(records[0], function(err, record) {
            if (err) {
                done(err);
            }

            expect(record).to.eql({name: 'player', hash: 'd41d8cd98f00b204e9800998ecf8427e', ip: '192.168.0.1', time: new Date(2016, 3, 21, 19, 01, 31)});
            done();
        });
    });

    it('should return object with parsed log record if record and callback are passed(record with clan-tag)', function(done) {
        utils.parseHashRecord(records[1], function(err, record) {
            if (err) {
                done(err);
            }
            expect(record).to.eql({name: 'player', tag: 'Clan', hash: 'd41d8cd98f00b204e9800998ecf8427e', ip: '192.168.0.1', time: new Date(2016, 3, 21, 19, 02, 31)});
            done();
        });
    });

});
