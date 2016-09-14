
/**
 * Player - represents player informations
 * @class
 *
 * @param {object} opts
 * @param {object} opts.username
 * @param {object} opts.hash
 *
 * @return {object} Player
 */
function Player(opts) {
    if(!opts || !opts.username || !opts.hash) {
        throw Error('No arguments were passed.');
    }
}


/**
 * getHashes function - return all hashes found for player
 * @memberof Player
 *
 * @return {array} Array of hashes
 */
Player.prototype.getHashes = function () {

};

Player.prototype.getNames = function () {



};

module.exports = Player;
