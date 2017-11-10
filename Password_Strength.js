const prompt = require('prompt');

const WEAK_PWD = "Weak Password";
const STRONG_PWD = "Strong Password";

const findPasswordStrength = pwd => {
	if(pwd.length < 6) return WEAK_PWD;

	const hasUpper = (/[A-Z]/g).test(pwd)
	const hasLower = (/[a-z]/g).test(pwd);
	const hasDigit = (/[0-9]/g).test(pwd);

	const distinctDigits = new Set(pwd.split('')).size;

	if(hasUpper && hasLower && hasDigit && (distinctDigits > 4))
		return STRONG_PWD;
	else
		return WEAK_PWD;
};

prompt.start();

prompt.get('password', (err, { password }) => {
	if(!err) {
		console.log(`Password strength: ${findPasswordStrength(password)}`);
	}
});

// Output
// arshad@anon ~ $ node Password_Strength.js
// prompt: password:  Asdfgh123
// Password strength: Strong Password
