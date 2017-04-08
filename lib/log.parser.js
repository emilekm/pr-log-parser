const _ = require('lodash');

/**
 * Abstrack class for parsing logs
 */
class LogParser {

    /**
     * Create parser
     * @param {buffer} buffer - Buffer containing logs.
     * @param {string} encoding - Buffer encoding.
     */
    constructor(buffer, encoding) {
        if (buffer && _.isBuffer(buffer)) {
            this.buffer = buffer;
            this.encoding = encoding;
        }
    }

    /**
     * Parse buffer to strings array
     * @param {buffer} buffer - Buffer containing logs.
     * @param {string} encoding - Buffer encoding.
     * @return {string[]} Records array
     */
    toArray(buffer, encoding) {
        if (!buffer) {
            throw new Error('Expected records buffer but got: ' + typeof buffer);
        }

        return buffer.toString(encoding).split('\n');
    }

    /**
     * Parse buffer
     * @return {Object[]} Parsed records array
     */
    parse() {
        if (!this.buffer) {
            throw new Error('Records buffer was not passed to constructor');
        }

        const records = this.toArray(this.buffer, this.encoding);

        records.pop();

        return _.map(records, (record) => {
            return this.parseRecord(record);
        });
    }

}

module.exports = LogParser;
