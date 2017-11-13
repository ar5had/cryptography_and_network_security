const prompt = require('prompt');

const key = [[5, 3], [3, 2]];
const det = (5 * 2) - (3 * 3);
const inverse = [[2, -3], [-3, 5]].map(e=>e.map(f => f/det));
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getCipheredMatrix = (textMatrix, caseType) => {
	let matrix;
	if(caseType === 'encryption') {
		matrix = key;
	} else {
		matrix = inverse;
	}

	const cipheredMatrix = [
		[
			(textMatrix[0][0] * matrix[0][0] + textMatrix[1][0] * matrix[0][1]) % 26
		],
		[
			(textMatrix[0][0] * matrix[1][0] + textMatrix[1][0] * matrix[1][1]) % 26
		]
	];

	return cipheredMatrix;
};

const encrypt = plainText => {
	plainText = plainText.split(' ');

	const plainTextMatrix = plainText.map(pair => [
		[+alphabet.indexOf(pair[0])], [+alphabet.indexOf(pair[1])]
	]);

	let encryptedTextMatrix =
		plainTextMatrix.map(e => getCipheredMatrix(e, 'encryption'));

	return encryptedTextMatrix.map(e =>
		e.map(pos =>alphabet[pos]).join('')
	).join(' ');
};

const decrypt = encryptedText => {
	encryptedText = encryptedText.split(' ');

	const encryptedTextMatrix = encryptedText.map(pair => [
		[+alphabet.indexOf(pair[0])], [+alphabet.indexOf(pair[1])]
	]);

	let decryptedTextMatrix =
		encryptedTextMatrix.map(e => getCipheredMatrix(e, 'decryption'));

	return decryptedTextMatrix.map(e =>
		e.map(pos =>alphabet[pos]).join('')
	).join(' ');
};

prompt.start();

console.log('\nNote: Only enter words of length 2!\n');
prompt.get('plainText', (err, { plainText }) => {
	if(!err) {
		plainText = plainText.toUpperCase();

		console.log('\nKey:\n');
		console.log(key.map(e => e.join(' ')).join('\n'));

		console.log(`\nPlain text: ${plainText}`);

		const encryptedText = encrypt(plainText);

		console.log(`\nEncrypted text: ${encryptedText}`);

		console.log('\nInverse:\n');
		console.log(inverse.map(e => e.join(' ')).join('\n'));

		const decryptedText = decrypt(encryptedText);
		console.log(`\nDecrypted text: ${decryptedText}`);
	}
});

// Output
//
// arshad@anon ~ $ node Hill_Cipher.js 
//
// Note: Only enter words of length 2!
//
// prompt: plainText:  At ta
//
// Key:
//
// 5 3
// 3 2
//
// Plain text: AT TA
//
// Encrypted text: FM RF
//
// Inverse:
//
// 2 -3
// -3 5
//
// Decrypted text: AT TA
