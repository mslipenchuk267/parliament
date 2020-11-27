import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'

import StateSelectorScreen from '../screens/news/StateSelectorScreen';

describe('StateSelectorScreen', () => {
    it('should display filtered states', () => {
      const {getByTestId, queryByText} = render(<StateSelectorScreen />)
      
      // Give query that should return nothing
      fireEvent.changeText(getByTestId("stateSearchBar"), "new");
      expect(queryByText('New Hampshire')).not.toBeNull();
      expect(queryByText('New Jersey')).not.toBeNull();
      expect(queryByText('New Mexico')).not.toBeNull();
      expect(queryByText('New York')).not.toBeNull();
    })
  
    it('renders the ListEmptyComponent itself when user gives a search query with no results', () => {
      const {getByTestId} = render(<StateSelectorScreen />)
      
      // Give query that should return nothing
      fireEvent.changeText(getByTestId("stateSearchBar"), "weefwfwefwe");
      expect(getByTestId('ListEmptyComponent')).not.toBeNull();
    })

    it('should not render ListEmptyComponent children for a valid search', () => {
      const { getByTestId, queryByText } = render(<StateSelectorScreen />);

      fireEvent.changeText(getByTestId("stateSearchBar"), "new");
      expect(queryByText('no results found 🕵️')).toBeNull();
      expect(queryByText('please try another query')).toBeNull();
    })
  
    it('renders the ListEmptyComponent text when user gives a search query with no results', () => {
      const {getByTestId, queryByText} = render(<StateSelectorScreen />)
      
      // Give query that should return nothing
      fireEvent.changeText(getByTestId("stateSearchBar"), "weefwfwefwe");
      expect(queryByText('no results found 🕵️')).not.toBeNull();
      expect(queryByText('please try another query')).not.toBeNull();
    })
  })
  