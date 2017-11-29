/**
 * Dapp module provides functions used to create dapp registration transactions.
 * @class dapp
 */

var crypto      = require('./crypto.js');
var constants   = require('../utils/constants.js');
var slots       = require('../time/slots.js');

/**
 * @method createDapp
 * @param secret
 * @param secondSecret
 * @param options
 * @param timeOffset
 *
 * @return {Object}
 */

function createDapp (secret, secondSecret, options, timeOffset) {
    var now = new Date().getTime();
    var time = timeOffset ? now - timeOffset : now;
    var keys = crypto.getKeys(secret);

    var transaction = {
        type: 5,
        amount: 0,
        fee: constants.fees.dapp,
        recipientId: null,
        senderPublicKey: keys.publicKey,
        timestamp: slots.getTime(time),
        asset: {
            dapp: {
                category: options.category,
                name: options.name,
                description: options.description,
                tags: options.tags,
                type: options.type,
                link: options.link,
                icon: options.icon
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
    createDapp: createDapp
};
