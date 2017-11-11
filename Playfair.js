const prompt = require('prompt');

// remove Q as it has least frequency
const alphabet = "ABCDEFGHIJKLMNOPRSTUVWXYZ";

const getMatrix = text => {
	text = text.replace(/Q/g, '');

	const uniqueLettersInText = Array.from(new Set(text)).join('');
	const lettersNotInText =
		alphabet.split('').filter(e=>!uniqueLettersInText.includes(e)).join('');

	// all letters - uniqueLettersInText followed by
	// the rest of the letters in alphabet
	const allLetters = uniqueLettersInText + lettersNotInText;

	console.log(text, uniqueLettersInText, lettersNotInText);

	// divide string into matrix
	// we'll get an array of 5 strings with each string having length = 5
	// no need to split each string into an array as string are also iterable
	// and bracket notation works with them
	const matrix = allLetters.match(/.{1,5}/g);

	return matrix;
};

prompt.start();

prompt.get('text', (err, { text }) => {
	if(!err) {
			text = text.toUpperCase();
			const matrix = getMatrix(text);
			// tbc
	}
});
