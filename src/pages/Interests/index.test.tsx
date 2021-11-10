import React from 'react';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Interests from "./";

import * as api from '../../api';

jest.mock('js-cookie', () => ({
  get: jest.fn()
}));

jest.mock('react-router', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('<Interests />', function () {
  describe('When form is submitted', () => {
    describe('When less than 8 interests have been selected', () => {
      let apiSpy: jest.SpyInstance;
      beforeEach(() => {
        apiSpy = jest.spyOn(api, 'default');
        const { getByTestId } = render(<Interests />);
        userEvent.click(screen.getByDisplayValue('book_and_glasses'))
        userEvent.click(getByTestId('interests-submit'));
      })
      it('should not send interests if less than 8 have been selected', async () => {
        await waitFor(() =>
          expect(apiSpy).not.toHaveBeenCalled())
      });
    })
    describe('When 8 interests have been selected', () => {
      let apiSpy: jest.SpyInstance;
      beforeEach(async () => {
        apiSpy = jest.spyOn(api, 'default');
        const { getByTestId } = render(<Interests />);
        userEvent.click(screen.getByDisplayValue('book_and_glasses'))
        userEvent.click(screen.getByDisplayValue('beer_being_poured'))
        userEvent.click(screen.getByDisplayValue('carnival_ride'))
        userEvent.click(screen.getByDisplayValue('cheers_with_coffee'))
        userEvent.click(screen.getByDisplayValue('coding_on_tidy_desk'))
        userEvent.click(screen.getByDisplayValue('collection_of_craft_items'))
        userEvent.click(screen.getByDisplayValue('gadgets'))
        userEvent.click(screen.getByDisplayValue('golf'))
        userEvent.click(screen.getByDisplayValue('hiking_outside'))
        userEvent.click(getByTestId('interests-submit'));
      })
      it('should send the interests to the interests endpoint on the api', async () => {
        await waitFor(() => {
          expect(apiSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/interests`, {
            interests: expect.arrayContaining(['reading', 'learning', 'alcohol', 'beer', 'adrenaline', 'outgoing', 'amusement', 'coffee', 'socialising', 'coding', 'working', 'tech', 'knitting', 'photography', 'art', 'creative_activities', 'style', 'golf', 'sport', 'hiking'])
          }, {
            method: 'POST'
          })
        });
      });
    })
  })
});
