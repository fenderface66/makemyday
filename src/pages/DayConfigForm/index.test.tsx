import React from 'react';
import DayConfigForm, {Status} from "./index";
import * as api from "../../api";
import {createMemoryHistory, MemoryHistory} from "history";
import { Router } from "react-router";
import {render, waitFor} from "@testing-library/react";

jest.mock('../../cookie.util.ts', () => ({
  getUserFromCookie: () => ({
    accessToken: 'test_token'
  })
}));

const renderComponentWithRouting = () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  return {
    ...render(
      <Router history={history}>
        <DayConfigForm />
      </Router>,
    ),
    history,
  }
}


describe("<DayConfigForm />", () => {
  describe("when the api interests status response states the user has no recorded interests", () => {
    beforeEach(async () => {
      (api.default as jest.Mock).mockImplementation(() => ({
        status: 200,
        body: {
          status: Status.HAS_NO_INTERESTS
        },
        json: () => ({
          status: Status.HAS_NO_INTERESTS
        })
      }));
    })
    it('redirects the user to the interests page', async () => {
      const apiSpy = jest.spyOn(api, 'default');
      const history : MemoryHistory = renderComponentWithRouting().history;
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalled()
      })
      expect(history.location.pathname).toBe("/interests");
    })
  })
  describe("when the api interests status response states the user has recorded interests", () => {
    beforeEach(async () => {
      (api.default as jest.Mock).mockImplementation(() => ({
        status: 200,
        body: {
          status: Status.HAS_INTERESTS
        },
        json: () => ({
          status: Status.HAS_INTERESTS
        })
      }));
    })
    it('redirects the user to the interests page', async () => {
      const apiSpy = jest.spyOn(api, 'default');
      const history : MemoryHistory = renderComponentWithRouting().history;
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalled()
      })
      expect(history.location.pathname).toBe("/");
    })
  })
})
