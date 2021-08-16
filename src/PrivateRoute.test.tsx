import React from 'react';
import {
  Router,
  Switch,
  MemoryRouter,
} from "react-router-dom";
import { createMemoryHistory } from 'history'
import renderer, { act } from 'react-test-renderer';
import PrivateRoute from "./PrivateRoute";
import Cookies from 'js-cookie';

describe('<PrivateRoute />', function () {
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
  it('redirects to the login page when a cookie is not present', async () => {
    let testHistory, testLocation;
    const history = createMemoryHistory();
    await act(async () => {
      renderer.create(
        <Router history={history as any}>
          <Switch>
            <PrivateRoute
              render={({ history , location }: {history: History, location: Location}) => {
                testHistory = history;
                testLocation = location;
                return null;
              }}
            />
          </Switch>
        </Router>
      );
    });
    if (!testLocation) {
      return
    }
    expect((testLocation as Location).pathname).toBe("/login");
  });
});
