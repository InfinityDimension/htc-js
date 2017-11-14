global.Buffer = global.Buffer || require('buffer').Buffer;
global.naclFactory = require('js-nacl');

global.naclInstance;
naclFactory.instantiate(function (nacl) {
	naclInstance = nacl;
});

caritas = {
	crypto : require('./lib/transactions/crypto.js'),
	dapp: require('./lib/transactions/dapp.js'),
	delegate : require('./lib/transactions/delegate.js'),
	multisignature : require('./lib/transactions/multisignature.js'),
	signature : require('./lib/transactions/signature.js'),
	transaction : require('./lib/transactions/transaction.js'),
	transfer: require('./lib/transactions/transfer'),
	vote : require('./lib/transactions/vote.js')
};

module.exports = caritas;
