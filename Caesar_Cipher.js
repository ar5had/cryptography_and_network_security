const prompt = require('prompt');

const encrypt = (text, key) =>
 text.split('')
 	.map(e=>String.fromCharCode(e.charCodeAt(0) + Number(key))).join('') ;

prompt.start();

prompt.get('text', (err, { text }) => {
	if(!err) {
		prompt.get('key', (err, { key }) => {
			if(!err) {
				console.log(`Original text: ${text}`);
				console.log(`Encrypted text: ${encrypt(text,key)}`);
			}
		});
	}
});
