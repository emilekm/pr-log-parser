const _ = require('lodash');

const LogParser = require('./log.parser');

/**
 * Class for parsing hash records
 * @extends LogParser
 */
class HashParser extends LogParser {

    /**
     * Create parser
     * @param {buffer} buffer - Buffer containing logs
     * @param {string} encoding - Buffer encoding
     */
    constructor(buffer, encoding) {
        super(buffer, encoding);
    }

    /**
     * @typedef {Object} HashRecord
     * @property {date} time
     * @property {string} hash
     * @property {string} tag
     * @property {string} name
     * @property {string} ip
     */

    /**
     * Parse record
     * @param {string} record - Hash record
     * @return {HashRecord} Hash record object
     */
    parseRecord(record) {

        if (!record || !_.isString(record)) {
            throw new Error('Expected record string but got: ' + typeof record);
        }

        /**
         * TODO: verify the string
         *
         * IP regex ([0-9]+.|[1-9][0-9].|1[0-9][0-9].|2[0-4][0-9].|25[0-5].)
         */

        const recordRegEx = /\[([0-9\-]+)\s+([0-9\:]+)\]\s+([0-9a-z]+)\s+(?:(\S+)\s(\S+)|(\S+))\s+([0-9]+.[0-9]+.[0-9]+.[0-9]+)/;

        let parsed = record.match(recordRegEx);

        let hashRecord = {
            time: new Date(Date.parse(parsed[1] + 'T' + parsed[2])),
            hash: parsed[3],
            name: parsed[5] || parsed[6],
            ip: parsed[7]
        }
        if (parsed[4]) hashRecord.tag = parsed[4];

        return hashRecord;
    }

}

module.exports = HashParser;
