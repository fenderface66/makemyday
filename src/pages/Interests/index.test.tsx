import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react'
import Interests from "./";

import * as api from '../../api';

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
  beforeAll(() => {
    jest.setTimeout(30000);
  })
  describe('When form is submitted', () => {
    describe('When less than 8 interests have been selected', () => {
      it('should not send interests if less than 8 have been selected', async () => {
        const apiSpy = jest.spyOn(api, 'default');
        const { getByTestId } = render(<Interests />);
        fireEvent.click(getByTestId('image_book_and_glasses'))
        fireEvent.click(getByTestId('interests-submit'));
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
        const { getByTestId } = render(<Interests />);
        // const bookImage = await findByTestId('image_book_and_glasses');
        // const beerImage = await findByTestId('image_beer_being_poured');
        // const carnivalImage = await findByTestId('image_carnival_ride');
        // const coffeeImage = await findByTestId('image_cheers_with_coffee');
        // const codingImage =
        // fireEvent.click()
        // fireEvent.click()
        // fireEvent.click()
        // fireEvent.click()
        // fireEvent.click(findByTestId('image_coding_on_tidy_desk'))
        // fireEvent.click(findByTestId('image_collection_of_craft_items'))
        // fireEvent.click(findByTestId('image_gadgets'))
        // fireEvent.click(findByTestId('image_golf'))
        // fireEvent.click(findByTestId('image_hiking_outside'))
        // fireEvent.click(findByTestId('interests-submit'));
        fireEvent.click(getByTestId('image_book_and_glasses'))
        fireEvent.click(getByTestId('image_beer_being_poured'))
        fireEvent.click(getByTestId('image_carnival_ride'))
        fireEvent.click(getByTestId('image_cheers_with_coffee'))
        fireEvent.click(getByTestId('image_coding_on_tidy_desk'))
        fireEvent.click(getByTestId('image_collection_of_craft_items'))
        fireEvent.click(getByTestId('image_gadgets'))
        fireEvent.click(getByTestId('image_golf'))
        fireEvent.click(getByTestId('image_hiking_outside'))
        fireEvent.click(getByTestId('interests-submit'));
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
