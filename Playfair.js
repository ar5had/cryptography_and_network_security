const prompt = require('prompt');

// remove Q as it has least frequency
const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

const getSpaceIndexes = text => {
	const spaceIndexes = [];
	for(let i = 0; i < text.length; i++)
		if(text[i] === ' ') spaceIndexes.push(i);
	return spaceIndexes;
};

const insertSpaces = (text, spaceIndexes) => {
	text = text.split('');
	spaceIndexes.forEach(e => text.splice(e, 0, ' '));
	return text.join('');
};

const getMatrix = text => {
	const uniqueLettersInText = Array.from(new Set(text)).join('');

	const lettersNotInText =
		alphabet.split('').filter(e=>!uniqueLettersInText.includes(e)).join('');

	// all letters - uniqueLettersInText followed by
	// the rest of the letters in alphabet
	const allLetters = uniqueLettersInText + lettersNotInText;

	// divide string into matrix
	// we'll get an array of 5 strings with each string having length = 5
	// no need to split each string into an array as string are also iterable
	// and bracket notation works with them
	const matrix = allLetters.match(/.{1,5}/g);

	return matrix;
};

const getPairs = text => {
	const X = 'X';
	const pairs = [];

	while(text) {
		let subStr = text.slice(0, 2);
		// make sure odd length string get paired with extraLetter
		subStr = subStr.length < 2 ? subStr + X : subStr;

		if(subStr[0] === subStr[1]){
			// separates all duplicate letters with X
			// using loop to target cases like : sasssss, dddddddd etc.
			while(subStr[0] === subStr[1]) {
				pairs.push(subStr[0] + X);

				text = text.slice(1);

				subStr = text.slice(0, 2);
			}
		} else {
			pairs.push(subStr);

			text = text.slice(2);
		}
	}

	return pairs;
}

const getRowAndColumn = (pair, matrix) => {
	const coordinates = [];

	pair.split('').forEach(letter => {
		let row = column = null;

		for(let i = 0; i < 5; i++) {
			const str = matrix[i];

			if(str.includes(letter)) {
				row = i;
				column = str.indexOf(letter);
			}
		}

		coordinates.push(row);
		coordinates.push(column);
	});

	return coordinates;
};

const encrypt = (text, matrix) => {
	let pairs = getPairs(text);

	// RULES:
	//
	// 1. Same column:
	// - Move each letter down ONE
	// - Upon reaching end of table, wrap around
	//
	// 2. Same row:
	// - Move each letter right ONE
	// - Upon reaching end of table, wrap around
	//
	// 3. Rectangle(different row & column)
	// - Swap the letters with the ones on the end of rectangle

	pairs = pairs.map(pair => {
		const [r1, c1, r2, c2] = getRowAndColumn(pair, matrix);

		let encryptedPair = '';
		// Case 1
		if(c1 === c2) {
			encryptedPair = matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
		}
		// Case 2
		else if(r1 === r2) {
			encryptedPair = matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
		}
		// Case 3
		else {
			encryptedPair = matrix[r1][c2] + matrix[r2][c1];
		}

		return encryptedPair;
	});

	return pairs.join('');
};

prompt.start();

prompt.get('key', (err, { key }) => {
	if(!err) {

		key = key.toUpperCase().replace(/\s/g, '').replace(/J/g, 'I');

		const matrix = getMatrix(key);

		prompt.get('text', (err, { text }) => {
			if(!err) {
				const spaceIndexes = getSpaceIndexes(text);

				// convert to uppercase, remove all spaces and replace J with I
				text = text.toUpperCase().replace(/\s/g, '').replace(/J/g, 'I');

				console.log("\nMatrix:\n");
				matrix.forEach(e => console.log(e.split``.join` `));

				let encryptedText = encrypt(text, matrix);

				// insert spaces
				encryptedText = insertSpaces(encryptedText, spaceIndexes);

				console.log("\nEncrypted text:", encryptedText);
			}
		});
	}
});
