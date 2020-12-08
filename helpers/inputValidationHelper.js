/**
  * UserName regex rules:
  * between 4-15 chars
  * no _ or . at the beginning
  * no _ or . at the end
  * no __ or _. or ._ or .. inside 
  * @return  {void}  
  * @example
  * userNameInputValidator(text)
  */
export const userNameInputValidator = text => {
    const userNameRegex = /^(?=[a-zA-Z0-9._]{4,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    let isValid = true;
    if (!userNameRegex.test(text)) {
        isValid = false;
    }
    return (isValid);
}

// export const emailInputValidator = text => {
//     const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     let isValid = true;
//     if (!emailRegex.test(text.toLowerCase())) {
//         isValid = false;
//     }
//     return (isValid);
// };


/**
  * passwordInputValidator
  * @return  {void}  
  * @example
  * passwordInputValidator(text)
*/
export const passwordInputValidator = text => {
    const containsNumber = /\d/g;      // regex for if number is in string
    const containsLowerCase = /[a-z]/; // regex for if lowercase letter in string
    const containsUpperCase = /[A-Z]/; // regex for if lowercase letter in string
    let isValid = true;
    let lengthValid = true
    let numberValid = true;
    let caseValid = true;
    if (text.length < 10) {
        lengthValid = false;
        isValid = false;
    }
    if (text.length > 24) {
        lengthValid = false;
        isValid = false;
    }
    if (!containsNumber.test(text)) {
        numberValid = false;
        isValid = false;
    }
    if (!containsLowerCase.test(text)) {
        caseValid = false;
        isValid = false;
    }
    if (!containsUpperCase.test(text)) {
        caseValid = false;
        isValid = false;
    }
    return ({ isValid, lengthValid, numberValid, caseValid });
}