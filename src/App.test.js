import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


jest.mock('js-cookie', () => ({
    get: () => JSON.stringify({
        accessToken: '123456789'
    })
}));

describe('<App />', () => {
    test('it renders correctly', () => {
        render(<App />)
    });
})

