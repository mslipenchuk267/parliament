import { filterStates } from '../helpers/filterHelper';
import { states } from '../constants/states';

describe('filterState function', () => {
    it('should filter all states that have p in their name', () => {
      const filterResult = filterStates(states, "p");
      const expectedResult = [{stateName: "Mississippi", stateCode: "MS"}, {stateName: "New Hampshire", stateCode: "NH"}, {stateName: "Pennsylvania", stateCode: "PA"}]
  
      expect(filterResult).toEqual(expectedResult)
    })
  
    it('should return same results for uppercase and lowercase query', () => {
      const lowerCaseFilterResult = filterStates(states, "n");
      const upperCaseFilterResult = filterStates(states, "N");
  
      expect(lowerCaseFilterResult).toEqual(upperCaseFilterResult)
    })
  
    it('should return all states for null query', () => {
      const filterResult = filterStates(states, "");
  
      expect(filterResult).toEqual(states);
    })
  })