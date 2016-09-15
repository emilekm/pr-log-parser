/**
 * @namespace Utils
 */
var utils = {};


/**
 * @typedef {Object} Record
 * @property {string} name
 * @property {string} hash
 * @property {string} ip
 * @property {date} time
 */

/**
 * Callback for parseHashRecord
 *
 * @callback parseHashRecordCallback
 * @param {error} error
 * @param {object} record
 */


/**
 * utils.parseHashRecord - Function to parse record taken from cdhash.log
 * @function parseHashRecord
 *
 * @memberof Utils
 *
 * @param  {string}              record
 * @param  {parseHashRecordCallback} callback
 */
utils.parseHashRecord = function(record, callback) {

    /**
     * Error handling
     */
    if (!record) {
        throw new Error('No arguments were passed');
    }
    if (typeof record === 'string' && !callback) {
        throw new Error('No callback function was provided');
    }
    if (typeof record !== 'string') {
        if (typeof record === 'function') {
            callback = record;
            return callback(new Error('Record was not passed'));
        } else if (callback && typeof callback === 'function') {
            return callback(new Error('Record must be a string'));
        } else {
            throw new Error('Record must be a string');
        }
    }

    /**
     * TODO: verify the string
     */

    var recordArr = record.split(' ');
    var parsedObj = {};

    recordArr[0] = recordArr[0].slice(1);
    recordArr[1] = recordArr[1].slice(0, -1);

    parsedObj.time = new Date(Date.parse(recordArr[0] + 'T' + recordArr[1]));
    parsedObj.hash = recordArr[2];

    if (recordArr.length === 6) {
        parsedObj.tag = recordArr[3];
        parsedObj.name = recordArr[4];
        parsedObj.ip = recordArr[5];
    } else  {
        parsedObj.name = recordArr[3];
        parsedObj.ip = recordArr[4];
    }

    return callback(null, parsedObj);

};

module.exports = utils;
