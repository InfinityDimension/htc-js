/**
 * Vote module provides functions for creating vote transactions.
 * @class vote
 */

var crypto      = require('./crypto.js');
var constants   = require('../utils/constants');
var slots       = require('../time/slots.js');

/**
 * @method createVote
 * @param secret
 * @param delegates
 * @param secondSecret
 * @param timeOffset
 *
 * @return {Object}
 */

function createVote (secret, delegates, secondSecret, timeOffset) {
    var now = new Date().getTime();
    var time = timeOffset ? now - timeOffset : now;
    var keys = crypto.getKeys(secret);

    var transaction = {
        type: 3,
        amount: 0,
        fee: constants.fees.vote,
        recipientId: crypto.getAddress(keys.publicKey),
        senderPublicKey: keys.publicKey,
        timestamp: slots.getTime(time),
        asset: {
            votes: delegates
        }
    };

    crypto.sign(transaction, keys);

    if (secondSecret) {
        var secondKeys = crypto.getKeys(secondSecret);
        crypto.secondSign(transaction, secondKeys);
    }

    transaction.id = crypto.getId(transaction);

    return transaction;
}

module.exports = {
    createVote: createVote
};
