const prompt = require('prompt');

const getEncryptedLetter = (e, key) => {
  // return non-alphabetic characters
  if((/[^a-z]/i).test(e)) return e;

  const charCode = e.charCodeAt(0);
  const minCode = e.toUpperCase() === e ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
  const diff = charCode - minCode + Number(key);
  return String.fromCharCode(minCode + (diff%26));
};

const encrypt = (text, key) =>
 text.split('')
 	.map(e=>getEncryptedLetter(e, key)).join('') ;

prompt.start();

prompt.get('text', (err, { text }) => {
	if(!err) {
		prompt.get('key', (err, { key }) => {
			if(!err) {
        // handles negative key test cases
        if(key < 0) return 26 + key;

				console.log(`Original text: ${text}`);
				console.log(`Encrypted text: ${encrypt(text,key)}`);
			}
		});
	}
});

// Output
// arshad@anon ~ $ node Caesar_Cipher.js 
// prompt: text:  timsy bhatia
// prompt: key:  2
// Original text: timsy bhatia
// Encrypted text: vkoua djcvkc
