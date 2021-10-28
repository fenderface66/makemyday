import React from 'react';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Interests from "./";

import * as api from '../../api';

jest.mock('js-cookie', () => ({
  get: jest.fn()
}));

jest.mock('../../cookie.util', () => ({
  getUserFromCookie: () => ({
    accessToken: '123456789'
  })
}));


describe('<Interests />', function () {

  describe('When form is submitted', () => {
    it('should send the interests to the interests endpoint on the api', async () => {
      const apiSpy = jest.spyOn(api, 'default');
      render(<Interests />)
      userEvent.click(screen.getByDisplayValue('book_and_glasses'))
      userEvent.click(screen.getByRole('button', {name: /submit/i}))

      await waitFor(() =>
        expect(apiSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/interests`, {
          access_token: '123456789',
          interests: expect.arrayContaining(['reading', 'learning'])
        }, {
          method: 'POST'
        }))
    });
  })

});
