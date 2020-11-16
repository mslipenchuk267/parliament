/**
 * This filters the states based on the users search query. 
 * If there is any match between a states name and the users query, 
 * then that state will be returned
 * @param {json array} states This an array containing state objects which include stateName and stateCode as params for each json entry
 * @param {string} searchQuery This is the user's raw search query
 * @returns {json array} updatedFilteredStates, the newly filtered states based on users query
 */
export const filterStates = (states, searchQuery) => {
    updatedFilteredStates = states.filter(state => state.stateName.toLowerCase().includes(searchQuery.toLowerCase()));
    return updatedFilteredStates;
}