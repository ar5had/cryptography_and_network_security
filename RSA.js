const prompt = require('prompt');

const p = 3;
const q = 7;
// e - publicKey
const e = 5;
// d - privateKey
let phi, d, n;

const generatePhi = (p, q) => (p-1)*(q-1);

const generatePrivateKey = (phi, e, constant = 2) => ((constant * phi) + 1)/e;



const encrypt = plainText => {
	n = p*q;

	console.log(`\nn: ${n}`);

	phi = generatePhi(p, q);

	console.log(`\nphi: ${phi}`);
	console.log(`\ne(publicKey): ${e}`);

	d = generatePrivateKey(phi, e);

	console.log(`\nd(Private Key): ${d}`);

	const cipheredText = Math.pow(plainText, e) % n;

	return cipheredText;
};

const decrypt = cipheredText => Math.pow(cipheredText, d) % n;

prompt.start();

prompt.get('plainText', (err, { plainText }) => {
	if(!err) {
		const encryptedText = encrypt(Number(plainText));
		const decryptedText = decrypt(encryptedText);

		console.log("\nPlain text:", plainText);
		console.log("\nEncrypted text:", encryptedText);
		console.log("\nDecrypted text:", decryptedText);
	}
});

// Output
//
// arshad@anon ~ $ node RSA.js
// prompt: plainText:  12
//
// n: 21
//
// phi: 12
//
// e(publicKey): 5
//
// d(Private Key): 5
//
// Plain text: 12
//
// Encrypted text: 3
//
// Decrypted text: 12
