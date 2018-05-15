/**
 * Multisignature module provides functions for creating multisignature group registration transactions, and signing transactions requiring multisignatures.
 * @class multisignature
 */

var crypto      = require('./crypto.js');
var constants   = require('../constants.js');
var slots       = require('../time/slots.js');

/**
 * @method createDapp
 * @param trs transaction object
 * @param secret
 *
 * @return {string}
 */

function signTransaction (trs, secret) {
	var keys = crypto.getKeys(secret);
	var signature = crypto.multiSign(trs, keys);

	return {
		transaction: trs.id,
		signature: signature
	};
}

/**
 * @method createMultisignature
 * @param secret string
 * @param secondSecret string
 * @param keysgroup array
 * @param lifetime number
 * @param min number
 *
 * @return {Object}
 */

function createMultisignature (secret, secondSecret, keysgroup, lifetime, min) {
	var keys = crypto.getKeys(secret);

	var keygroupFees = keysgroup.length + 1;

	var transaction = {
		type: 4,
		amount: 0,
		fee: (constants.fees.multisignature * keygroupFees),
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
		asset: {
			multisignature: {
				min: min,
				lifetime: lifetime,
				keysgroup: keysgroup
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
	signTransaction: signTransaction,
	createMultisignature: createMultisignature
};
