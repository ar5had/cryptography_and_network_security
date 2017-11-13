const prompt = require('prompt');

let matrix;

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

const encrypt = (plainText, key) => {
	const length = plainText.length;

	// array having undefined values
	matrix = new Array(key).fill();
	// filling matrix with new arrays every time
	matrix = matrix.map(_ => new Array(length).fill(''));

	let i = j = 0, inc = true;

	while(i < plainText.length) {
		matrix[j][i] = plainText[i];

		if((j+1) === key) inc = false;
		else if(j === 0) inc = true;

		if(inc) j++
		else j--;

		i++;
	}

	console.log('\nMatrix: ');
	console.log(matrix.map(e => e.join(' _ ')).join('\n'))

	return matrix.map(e => e.join('')).join('');
};

const decrypt = (encryptedText, key) => {
	const length = encryptedText.length;
	let decryptedText = '';
	// array having undefined values
	// let matrix = new Array(key).fill();
	// filling matrix with new arrays every time
	// matrix = matrix.map(_ => new Array(length).fill(''));
	//
	let i = j = 0, inc = true;

	while(i < encryptedText.length) {
		decryptedText += matrix[j][i];

		if((j+1) === key) inc = false;
		else if(j === 0) inc = true;

		if(inc) j++
		else j--;

		i++;
	}



	return decryptedText;
};

prompt.start();

prompt.get('key', (err, { key }) => {
	if(!err) {
		key = Number(key);

		prompt.get('plainText', (err, { plainText }) => {
			if(!err) {
				console.log(`\nPlain text: ${plainText}`);

				const spaceIndexes = getSpaceIndexes(plainText);

				plainText = plainText.replace(/\s/g, '');

				const encryptedText = encrypt(plainText, key);

				const decryptedText = decrypt(encryptedText, key);

				console.log(`\nEncrypted text: ${encryptedText}`);
				console.log(`\nDecrypted text: ${decryptedText}`);
			}
		});
	}
});

// Output
