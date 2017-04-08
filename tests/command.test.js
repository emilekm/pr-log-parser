const chai = require('chai');
const expect = chai.expect;

const CommandParser = require('../lib/command.parser');

describe('CommandParser.parseRecord', () => {

    it('should throw error if no arguments passed in', () => {
        expect(() => {
            new CommandParser().parseRecord();
        }).to.throw(Error, 'Record was not passed');
    });

    it('should throw error if something else than string is passed', () => {
        expect(() => {
            new CommandParser().parseRecord([]);
        }).to.throw(Error, 'Record must be a string');
    });

    it('should return record object if string record is passed (issuer without clan-tag)', () => {
        expect(new CommandParser().parseRecord(
            '[2017-04-05 00:37:51] !SAY            performed by \' K_Rivers\': Intentional Road Killing is prohibited, under any circumstances.'
        )).to.eql({
            time: new Date(Date.UTC(2017, 3, 5, 00, 37, 51)),
            command: "SAY",
            issuer: {
                name: 'K_Rivers'
            },
            content: 'Intentional Road Killing is prohibited, under any circumstances.'
        });
    });

    it('should return record object if string record is passed (issuer and receiver with clan-tag)', () => {
        expect(new CommandParser().parseRecord(
            '[2017-04-04 21:08:25] !KICK           performed by \'[BB] Tonymount1\' on \'[GDW] Menuen\': spam and language'
        )).to.eql({
            time: new Date(Date.UTC(2017, 3, 4, 21, 8, 25)),
            command: "KICK",
            issuer: {
                tag: '[BB]',
                name: 'Tonymount1'
            },
            receiver: {
                tag: '[GDW]',
                name: 'Menuen'
            },
            content: 'spam and language'
        });
    });
});
