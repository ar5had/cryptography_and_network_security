const prompt = require('prompt');

const getRandomKey = (min = 1, max = 26)=>  (
	Math.floor(Math.random() * (max - min + 1)) + min
);

const getEncryptedLetter = (e, key) => {
  // return non-alphabetic characters
  if((/[^a-z]/i).test(e)) return e;

  const charCode = e.charCodeAt(0);
  const minCode = e.toUpperCase() === e ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
  const diff = charCode - minCode + Number(key);
  return String.fromCharCode(minCode + (diff%26));
};

const encrypt = (text, keys) =>
 text.split('')
 	.map((e,i)=>getEncryptedLetter(e, keys[i])).join('') ;

const decrypt = (text, keys) =>
	text.split('')
	// just take the difference of (26 - key) to decrypt text
	 .map((e,i)=>getEncryptedLetter(e, 26 - keys[i])).join('') ;


prompt.start();

prompt.get('text', (err, { text }) => {
	if(!err) {
		const keys = text.split('').map(() => getRandomKey())

		console.log(`Original text: ${text}`);
		console.log(`keys: ${keys}`);

		const encryptedText = encrypt(text, keys);

		console.log(`Encrypted text: ${encryptedText}`);
		console.log(`Decrypted text: ${decrypt(encryptedText, keys)}`)
	}
});

// Output
// arshad@anon ~ $ node Polyalphabetic_cipher.js 
// prompt: text:  arshad Khan
// Original text: arshad Khan
// keys: 21,1,21,15,7,7,10,15,19,11,17
// Encrypted text: vsnwhk Zale
// Decrypted text: arshad Khan
