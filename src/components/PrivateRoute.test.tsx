import React from 'react';
import {
  Router,
  Switch,
  MemoryRouter,
} from "react-router-dom";
import Cookies from 'js-cookie';
import { createMemoryHistory } from 'history'
import renderer, { act } from 'react-test-renderer';
import PrivateRoute from "./PrivateRoute";

import * as api from '../api';

jest.mock('./api', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    status: 401
  })),
}))

jest.mock('js-cookie', () => ({
  get: jest.fn()
}));

const renderComponentWithRouting = () => {
  let renderedHistory, renderedLocation;
  const memoryHistory = createMemoryHistory();
  renderer.create(
    <Router history={memoryHistory as any}>
      <Switch>
        <PrivateRoute
          render={({ history , location }: {history: History, location: Location}) => {
            renderedHistory = history;
            renderedLocation = location;
            return null;
          }}
        />
      </Switch>
    </Router>
  );
  return {
    renderedHistory,
    renderedLocation,
  }
}



describe('<PrivateRoute />', function () {
  let testHistory: History | undefined;
  let testLocation: Location | undefined;
  it('should check to see if a user cookie exists', async () => {
    const getCookieSpy = jest.spyOn(Cookies, 'get');
    await act(async () => {
      renderer.create(
        <MemoryRouter>
          <Switch>
            <PrivateRoute />
          </Switch>
        </MemoryRouter>
        );
    });
    expect(getCookieSpy).toHaveBeenCalledWith('user');
  });
  describe('When the cookie is not present', () => {
    it('redirects to the login page when a cookie is not present', async () => {
      await act(async () => {
        const { renderedHistory, renderedLocation } = await renderComponentWithRouting();
        testHistory = renderedHistory;
        testLocation = renderedLocation;
      });
      if (!testLocation) {
        return
      }
      expect((testLocation as Location).pathname).toBe("/login");
    });
  })
  describe('when the cookie is present', () => {
    beforeEach(() => {
      (Cookies.get as jest.Mock).mockImplementation(() => JSON.stringify({
        accessToken: '123456789'
      }));
      (api.default as jest.Mock).mockImplementation(() => ({
        status: 401
      }));
    })
    it('validates the token via the api', async () => {
      const apiSpy = jest.spyOn(api, 'default');
      await act(async () => {
        await renderComponentWithRouting();
      });
      expect(apiSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/google/authenticate`, {
        token: '123456789',
      }, {
        method: 'POST'
      })
    })
    describe('when the api identifies the token as invalid',  () => {
      beforeEach(() => {
        (api.default as jest.Mock).mockImplementation(() => ({
          status: 401
        }));
      })
      it('redirects the user to the login page', async () => {
        await act(async () => {
          const { renderedHistory, renderedLocation } = await renderComponentWithRouting();
          testHistory = renderedHistory;
          testLocation = renderedLocation;
        });
        if (!testLocation) {
          return
        }
        expect((testLocation as Location).pathname).toBe("/login");
      })
    })
    describe('when the api identifies the token as valid', () => {
      beforeEach(() => {
        (api.default as jest.Mock).mockImplementation(() => ({
          status: 201
        }));
      })
      it('does not redirect the user to the login page', async () => {
        await act(async () => {
          const { renderedHistory, renderedLocation } = await renderComponentWithRouting();
          testHistory = renderedHistory;
          testLocation = renderedLocation;
        });
        if (!testLocation) {
          return
        }
        expect((testLocation as Location).pathname).not.toBe("/login");
      })
    })
  })
});
