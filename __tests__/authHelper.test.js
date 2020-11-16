import { isRefreshNeeded } from '../helpers/authHelper';

describe('isRefreshNeeded', () => {
    it('should return true if current date is less than to acceesTokenExpiration', () => {
        accessTokenExpiration = new Date();
        accessTokenExpiration.setMinutes(accessTokenExpiration.getMinutes() - 15);

        const result = isRefreshNeeded(accessTokenExpiration)

        expect(result).toEqual(true)
    })

    it('should return false if current date is greater than accessTokenExpiration', () => {
        accessTokenExpiration = new Date();
        accessTokenExpiration.setMinutes(accessTokenExpiration.getMinutes() + 15);

        const result = isRefreshNeeded(accessTokenExpiration)

        expect(result).toEqual(false)
    })
})
