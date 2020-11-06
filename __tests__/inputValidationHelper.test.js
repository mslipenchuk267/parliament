const { userNameInputValidator, passwordInputValidator } = require("../helpers/inputValidationHelper")

describe('userNameInputValidator', () => {
    //Username check
    it('should return false if username is less than 4 chars', () => {
        const result = userNameInputValidator("abc");
        const expectedResult = false

        expect(result).toEqual(expectedResult)
    })

    it('should return false if username is greater than 15 chars', () => {
        const result = userNameInputValidator("asdfghjklqwertyu");
        const expectedResult = false

        expect(result).toEqual(expectedResult)
    })

    it('should return true if username is 4 chars', () => {
        const result = userNameInputValidator("abcd");
        const expectedResult = true

        expect(result).toEqual(expectedResult)
    })

    it('should return true if username is 15 chars', () => {
        const result = userNameInputValidator("asdfghjklqwerty");
        const expectedResult = true

        expect(result).toEqual(expectedResult)
    })

    it('should return true if username is between 4 and 15 chars', () => {
        const result = userNameInputValidator("asdfghjkl");
        const expectedResult = true

        expect(result).toEqual(expectedResult)
    })

    //Passwords check

    //True:     

    //Passwords == 10
    it('should return true if passwords length equals to 10', () => {
        const result = passwordInputValidator("nhKmK4f4QY").numberValid;
        const expectedResult = true
        expect(result).toEqual(expectedResult)
    })

    //Passwords >=10 && < 24
    it('should return true if passwords length greater equals to 10 and less than 24', () => {
        const result = passwordInputValidator("4dztUk7pVG2GNwznptW").lengthValid;
        const expectedResult = true
        expect(result).toEqual(expectedResult)
    })

    //Passwords contains uppercase,lowercase, and numebers
    it('should return true if Passwords contains uppercase,lowercase, and numebers', () => {
        const result = passwordInputValidator("fGuED93mw2eh5tbtngX").isValid;
        const expectedResult = true
        expect(result).toEqual(expectedResult)
    })

    //False:
    //Passwords < 10
    it('should return false if Passwords length less than 10', () => {
        const result = passwordInputValidator("DuWp65h").lengthValid;
        const expectedResult = false
        expect(result).toEqual(expectedResult)
    })

    //Passwords > 24
    it('should return false if Passwords length greater than 24', () => {
        const result = passwordInputValidator("3WxqC559sgaeckWKqVxQZuS5y").lengthValid;
        const expectedResult = false
        expect(result).toEqual(expectedResult)
    })

    //Passwords do not contains uppercase
    it('should return false if Passwords do not contains uppercase', () => {
        const result = passwordInputValidator("t74q7s8srwdq").caseValid;
        const expectedResult = false
        expect(result).toEqual(expectedResult)
    })

    //Passwords do not contains lowercase
    it('should return false if Passwords do not contains lowercase', () => {
        const result = passwordInputValidator("WGPH9U6SPEYP").caseValid;
        const expectedResult = false
        expect(result).toEqual(expectedResult)
    })

    //Passwords do not contains numbers
    it('should return false if Passwords do not contains number', () => {
        const result = passwordInputValidator("ppNfpqUprYUC").numberValid;
        const expectedResult = false
        expect(result).toEqual(expectedResult)
    })
})