const chai = require('chai');
const expect = chai.expect;

const HashParser = require('../lib/hash.parser');

describe('HashParser.parseRecord', () => {

    it('should throw error if no arguments passed in', () => {
        expect(() => {
            new HashParser().parseRecord();
        }).to.throw(Error, 'Expected record string but got: undefined');
    });

    it('should throw error if something else than string is passed', () => {
        expect(() => {
            new HashParser().parseRecord([]);
        }).to.throw(Error, 'Expected record string but got: object');
    });

    it('should return record object if string record is passed (record without clan-tag)', () => {
        expect(new HashParser().parseRecord(
            '[2016-04-21 19:01:31] d41d8cd98f00b204e9800998ecf8427e player 127.0.0.1'
        )).to.eql({
            time: new Date(Date.UTC(2016, 3, 21, 19, 01, 31)),
            hash: 'd41d8cd98f00b204e9800998ecf8427e',
            name: 'player',
            ip: '127.0.0.1'
        });
    });

    it('should return record object if string record is passed (record with clan-tag)', () => {
        expect(new HashParser().parseRecord(
            '[2016-04-21 19:02:31] d41d8cd98f00b204e9800998ecf8427e Clan player 127.0.0.1'
        )).to.eql({
            time: new Date(Date.UTC(2016, 3, 21, 19, 02, 31)),
            hash: 'd41d8cd98f00b204e9800998ecf8427e',
            tag: 'Clan',
            name: 'player',
            ip: '127.0.0.1'
        });
    });
});
