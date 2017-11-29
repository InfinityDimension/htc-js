/**
 * Delegate module provides functions to create delegate registration transactions.
 * @class delegate
 */

var crypto      = require('./crypto.js');
var constants   = require('../utils/constants.js');
var slots       = require('../time/slots.js');

/**
 * @method createDapp
 * @param secret
 * @param username
 * @param secondSecret
 * @param timeOffset
 *
 * @return {Object}
 */

function createDelegate (secret, username, secondSecret, timeOffset) {
    var now = new Date().getTime();
    var time = timeOffset ? now - timeOffset : now;
    var keys = crypto.getKeys(secret);

    var transaction = {
        type: 2,
        amount: 0,
        fee: constants.fees.delegate,
        recipientId: null,
        senderPublicKey: keys.publicKey,
        timestamp: slots.getTime(time),
        asset: {
            delegate: {
                username: username,
                publicKey: keys.publicKey
            }
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
    createDelegate: createDelegate
};
