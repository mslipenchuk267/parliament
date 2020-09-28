const initialState = {
    accessToken: "",
    accessTokenExpiration: "",
    refreshToken: "",
    refreshTokenExpiration: "",
    contactedIDs: [],
    deviceToken: "",
    userID: "",
    notificationHistory: [],
    tempIDs: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        // case

        default:
            return state;
    }
}