/*
** Joseph
** Form Validation logic
*/
export default {
	emailRegEx: /^.+@.+\..+$/gi, //email,
	stringRegEx: /^([a-z]|[A-Z]|\s)+$/gi,//only letters, can be space in between
	pwdRegEx: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{4,15}$/, //password
	/*
	** Checks if the passed string is empty
	** returns true if empty
	*/
	isEmpty: function(passed) {
		return !passed.trim().length;
	},
	/*
	** Checks if the passed string is a valid password
	** should be min 4 chars, max 15 chars
	** should have letters (uppercase or lowercase), numbers, special chars
	*/
	isValidPassword: function(passed) {
		return passed.trim().match(this.pwdRegEx);
	},
	/*
	** Checks if the passed string has letters only
	** returns true if satisfied
	*/
	isStringOnly: function(passed) {
		return passed.trim().match(this.stringRegEx);
	},
	/*
	** Checks if the passed string has numeral chars only
	** returns true if satisfied
	*/
	isNumberString: function(passed) {
		return !isNaN(passed.trim());
	},
	/*
	** should be in email formar eg. joseph@gmail.com
	** Once char atleast before @.
	** returns array if satisfied.
	** returns null is not satisfied which is false by default
	*/
	isValidEmail: function(passed) {
		return passed.trim().match(this.emailRegEx);
	},
	/*
	** Checks if the passed string satisfies its max length
	** returns true if satisfied
	*/
	isMaxLengthSatisfied: function(passed, maxLength) {
		return (passed.trim().length <= maxLength);
	},
	/*
	** filter input data for XSS attacks
	** handle DOM XSS issue and strip off any HTML tags like <script>, <img> from your input value before using them
	** returns filtered string
	*/
	filterData: function(origData) {
	    if (origData) {
	        return origData.replace(/(<([^>]+)>)/ig, ""); //this will strip off any HTML tags including <script>, <img/>
	    }
	    return '';
	}
};