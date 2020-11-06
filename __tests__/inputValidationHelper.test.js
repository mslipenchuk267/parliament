const { userNameInputValidator } = require("../helpers/inputValidationHelper")

describe('userNameInputValidator', () => {
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


})