import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react'
import Interests from "./";

import * as api from '../../api';


jest.mock('../../api', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(() => Promise.resolve(() => ({
    status: 201,
  }))),
}));

jest.mock('js-cookie', () => ({
  get: () => JSON.stringify({
    accessToken: '123456789'
  })
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
        fireEvent.click(await findByTestId('image_book_and_glasses'))
        fireEvent.click(await findByTestId('interests-submit'));
        await waitFor(async () => {
          expect(apiSpy).not.toHaveBeenCalled()
        })
      });
    })
    describe('When 8 interests have been selected', () => {
      it('should send the interests to the interests endpoint on the api', async () => {
        jest.useRealTimers()
        const apiSpy = jest.spyOn(api, 'default');
        // @ts-ignore
        apiSpy.mockReturnValue(Promise.resolve({
          status: 201,
        }));
        const { findByTestId, unmount } = render(<Interests />);
        fireEvent.click(await findByTestId('image_book_and_glasses'))
        fireEvent.click(await findByTestId('image_beer_being_poured'))
        fireEvent.click(await findByTestId('image_carnival_ride'))
        fireEvent.click(await findByTestId('image_cheers_with_coffee'))
        fireEvent.click(await findByTestId('image_coding_on_tidy_desk'))
        fireEvent.click(await findByTestId('image_collection_of_craft_items'))
        fireEvent.click(await findByTestId('image_gadgets'))
        fireEvent.click(await findByTestId('image_golf'))
        fireEvent.click(await findByTestId('image_hiking_outside'))
        fireEvent.click(await findByTestId('interests-submit'));
        unmount();
        await waitFor(async () => {
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
