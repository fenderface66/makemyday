import React from 'react';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Interests from "./";

import * as api from '../../api';


jest.mock('../../api', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(() => Promise.resolve(() => ({
    status: 201,
  }))),
}));

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
      it('should not send interests if less than 8 have been selected', async () => {
        const apiSpy = jest.spyOn(api, 'default');
        const { findByTestId } = render(<Interests />);
        await waitFor(async () => {
          userEvent.click(await screen.findByDisplayValue('book_and_glasses'))
          userEvent.click(await findByTestId('interests-submit'));
          expect(apiSpy).not.toHaveBeenCalled()
        })
      });
    })
    describe('When 8 interests have been selected', () => {
      it('should send the interests to the interests endpoint on the api', async () => {
        const apiSpy = jest.spyOn(api, 'default');
        // @ts-ignore
        apiSpy.mockReturnValue(Promise.resolve({
          status: 201,
        }));
        const { findByTestId } = render(<Interests />);
        await waitFor(async () => {
          userEvent.click(await screen.findByDisplayValue('book_and_glasses'))
          userEvent.click(await screen.findByDisplayValue('beer_being_poured'))
          userEvent.click(await screen.findByDisplayValue('carnival_ride'))
          userEvent.click(await screen.findByDisplayValue('cheers_with_coffee'))
          userEvent.click(await screen.findByDisplayValue('coding_on_tidy_desk'))
          userEvent.click(await screen.findByDisplayValue('collection_of_craft_items'))
          userEvent.click(await screen.findByDisplayValue('gadgets'))
          userEvent.click(await screen.findByDisplayValue('golf'))
          userEvent.click(await screen.findByDisplayValue('hiking_outside'))
          userEvent.click(await findByTestId('interests-submit'));
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
