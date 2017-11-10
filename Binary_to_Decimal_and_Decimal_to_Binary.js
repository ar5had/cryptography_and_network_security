const prompt = require('prompt');

const b2d = binaryString => parseInt(binaryString, 2);

const d2b = decimalNumber => Number(decimalNumber).toString(2);

prompt.start();

prompt.get('binaryNumber', (err, { binaryNumber }) => {
	if(!err) {
		console.log(`Decimal equivalent - ${b2d(binaryNumber)}\n`);

		prompt.get('decimalNumber', (err, { decimalNumber }) => {
			if(!err) {
				console.log(`Binary equivalent - ${d2b(decimalNumber)}`);
			}
		});
	}
});


// Output
// arshad@anon ~ $ node Binary_to_Decimal_and_Decimal_to_Binary.js 
// prompt: binaryNumber:  111
// Decimal equivalent - 7
//
// prompt: decimalNumber:  10
// Binary equivalent - 1010
