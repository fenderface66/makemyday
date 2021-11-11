import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react'
import Interests from "./";

import * as api from '../../api';

jest.mock('../../api', () => ({
  __esModule: true,
  default: jest.fn(),
}))

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
    console.log('RUNNING BEFORE ALL');
    jest.setTimeout(30000);

  })
  beforeEach(async () => {
    console.log('RUNNING BEFORE EACH');
    (api.default as jest.Mock).mockImplementation(() => ({
      status: 201,
      body: {},
      json: () => ({})
    }));
  })
  describe('When form is submitted', () => {
    describe('When less than 8 interests have been selected', () => {
      console.log('RUNNING 1ST TEST');
      it('should not send interests if less than 8 have been selected', async () => {
        const apiSpy = jest.spyOn(api, 'default');
        const { findByTestId } = render(<Interests />);
        const bookImage = await findByTestId('image_book_and_glasses');
        const interestsSubmitButton = await findByTestId('interests_submit');
        fireEvent.click(bookImage)
        fireEvent.click(interestsSubmitButton);
        await waitFor(async () => {
          expect(apiSpy).not.toHaveBeenCalled()
        })
      });
    })
    describe('When 8 interests have been selected', () => {
      it('should send the interests to the interests endpoint on the api', async () => {
        console.log('RUNNING 2ND TEST');
        const apiSpy = jest.spyOn(api, 'default');
        const { findByTestId } = render(<Interests />);
        const bookImage = await findByTestId('image_book_and_glasses');
        const beerImage = await findByTestId('image_beer_being_poured');
        const carnivalImage = await findByTestId('image_carnival_ride');
        const coffeeImage = await findByTestId('image_cheers_with_coffee');
        const codingImage = await findByTestId('image_coding_on_tidy_desk');
        const craftItemsImage = await findByTestId('image_collection_of_craft_items');
        const gadgetsImage = await findByTestId('image_gadgets');
        const golfImage = await findByTestId('image_golf');
        const hikingImage = await findByTestId('image_hiking_outside');
        const interestsSubmitButton = await findByTestId('interests_submit');
        fireEvent.click(bookImage)
        fireEvent.click(beerImage)
        fireEvent.click(carnivalImage)
        fireEvent.click(coffeeImage)
        fireEvent.click(codingImage)
        fireEvent.click(craftItemsImage)
        fireEvent.click(gadgetsImage)
        fireEvent.click(golfImage)
        fireEvent.click(hikingImage)
        fireEvent.click(interestsSubmitButton);
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
