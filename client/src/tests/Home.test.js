import React from 'react';
import {findByLabelText, fireEvent, getByText, render, within} from '@testing-library/react';
import Home from '../pages/Home';

describe('Search component', () => {
   it('should render', () => {
       const {getByPlaceholderText} = render(<Home />);
       expect(getByPlaceholderText('search')).toBeInTheDocument();
   });

   it('a key word can be entered in search bar', () => {
	const {getByPlaceholderText,getByRole,findByLabelText} = render(<Home />);
	const autocomplete = getByRole("list");
	const search = within(autocomplete).getByPlaceholderText('search');
	fireEvent.change(search,{target:{value:"america"}});
});
});

