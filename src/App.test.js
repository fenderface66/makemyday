import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


describe('<App />', () => {
    test('it renders correctly', () => {
        render(<App />)
    });
})

