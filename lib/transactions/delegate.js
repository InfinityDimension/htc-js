/**
 * Delegate module provides functions to create delegate registration transactions.
 * @class delegate
 */

var crypto      = require('./crypto.js');
var constants   = require('../constants.js');
var slots       = require('../time/slots.js');

/**
 * @method createDelegate
 * @param secret
 * @param username
 * @param secondSecret
 *
 * @return {Object}
 */

function createDelegate (secret, username, secondSecret) {
	var keys = crypto.getKeys(secret);

	var transaction = {
		type: 2,
		amount: 0,
		fee: constants.fees.delegate,
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
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
