/**
 * @namespace Utils
 */
var utils = {};


/**
 * @typedef {Object} Record
 * @property {string} username
 * @property {string} hash
 * @property {string} ip
 * @property {date} time
 */

/**
 * Callback for parseRecord
 *
 * @callback parseRecordCallback
 * @param {error} error
 * @param {object} record
 */


/**
 * utils.parseRecord - Function to parse record taken from cdhash.log
 * @function parseRecord
 *
 * @memberof Utils
 *
 * @param  {string}              record
 * @param  {parseRecordCallback} callback
 */
utils.parseRecord = function(record, callback) {
    if (!record) {
        throw new Error('No arguments were passed');
    }
    if (typeof record !== 'string') {
        if (!callback) {
            if (typeof record === 'function') {
                callback = record
                callback(new Error('Record was not passed'));
            } else {
                throw new Error('Record must be a string');
            }
        }
    }
};

module.exports = utils;
