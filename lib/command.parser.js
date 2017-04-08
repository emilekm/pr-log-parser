const _ = require('lodash');

const LogParser = require('./log.parser');

/**
 * Class for parsing command records
 * @extends LogParser
 */
class CommandParser extends LogParser {

    /**
     * Create parser
     * @param {buffer} buffer - Buffer containing logs
     * @param {string} encoding - Buffer encoding
     */
    constructor(buffer, encoding) {
        super(buffer, encoding);
    }

    /**
     * @typedef {Object} CommandRecord
     * @property {date} time
     * @property {string} command
     * @property {Object} issuer
     * @property {string} issuer.tag
     * @property {string} issuer.name
     * @property {Object} receiver
     * @property {string} receiver.tag
     * @property {string} receiver.name
     * @property {string} content
     */

    /**
     * Parse record
     * @param {string} record - Command record
     * @return {CommandRecord} Command record object
     */
    parseRecord(record) {
        if (!record) {
            throw new Error('Record was not passed');
        }

        if (!_.isString(record)) {
            throw new Error('Record must be a string');
        }

        /**
         * TODO: verify the string
         * TODO: cut command in regex
         */

        const recordRegEx = /\[([0-9\-]+)\s+([0-9\:]+)\]\s+([A-Z\!]+)[ a-zA-Z]+'\s*(?:(\S+)\s(\S+)|(\S+))'(?: on '\s*(?:(\S+)\s(\S+)|(\S+))')?:\s*(.*)/;

        let parsed = record.match(recordRegEx);

        let commandRecord = {
            time: new Date(Date.parse(parsed[1] + 'T' + parsed[2])),
            command: parsed[3][0] === '!' ? parsed[3].slice(1) : parsed[3],
            issuer: {
                name: parsed[5] || parsed[6]
            },
            content: parsed[10]
        }

        if (parsed[4]) commandRecord.issuer.tag = parsed[4];

        if (parsed[8] || parsed[9]) commandRecord.receiver = { name: parsed[8] || parsed[9] };

        if (parsed[7]) commandRecord.receiver.tag = parsed[7];

        return commandRecord;
    }
}

module.exports = CommandParser;
