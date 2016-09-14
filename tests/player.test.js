const chai = require('chai');
const expect = chai.expect;

var Player = require('../lib/Player');

describe('Player', function() {
    it('constructor should return error if no options are passed in', function() {
        expect(Player).to.throw(Error);
    });
});
