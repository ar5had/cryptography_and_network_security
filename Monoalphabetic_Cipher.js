const prompt = require('prompt');

// each letter of this encryptedKey
// will substitute "ABCDEFGHIJKLMNOPQRSTUVWXYZ" letterwise
const encryptedKey = 'SWNAMLXCVJBUYKPDOQERIFHGZT';

const encrypt = text =>
 text.split('')
 	.map(e=>(/[A-z]/i.test(e)) ?
		encryptedKey[e.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)]
		: e).join('') ;

prompt.start();

prompt.get('text', (err, { text }) => {
	if(!err) {
		if(!err) {
			console.log(`Original text: ${text}`);
			console.log(`Encrypted text: ${encrypt(text)}`);
		}
	}
});
