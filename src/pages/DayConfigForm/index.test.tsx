import React from "react";
import DayConfigForm, { Status } from "./index";
import * as api from "../../api";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { act } from "react-test-renderer";

const renderComponentWithRouting = () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  return {
    ...render(
      <Router history={history}>
        <DayConfigForm />
      </Router>
    ),
    history,
  };
};

describe("<DayConfigForm />", () => {
  describe("filling out the form and submitting", () => {
    beforeEach(async () => {
      (api.default as jest.Mock).mockImplementation(() => ({
        status: 200,
        body: {
          status: Status.HAS_INTERESTS,
        },
        json: () => ({
          status: Status.HAS_INTERESTS,
        }),
      }));

      await waitFor(() => {
        renderComponentWithRouting();
      });

      (api.default as jest.Mock).mockClear();

      (api.default as jest.Mock).mockImplementation(() => ({
        status: 201,
        body: {
          schedule: {},
        },
        json: () => ({
          schedule: {},
        }),
      }));
    });
    it("sends the forms values to the api", async () => {
      const apiSpy = jest.spyOn(api, "default");
      act(() => {
        fireEvent.click(screen.getByTestId("requested_day_periods_morning"));
        fireEvent.click(screen.getByTestId("requested_activity_types_active"));
        fireEvent.click(screen.getByTestId("requested_activity_types_social"));
        fireEvent.click(
          screen.getByTestId("requested_activity_types_amusement")
        );
      });
      await waitFor(() => {
        act(() => {
          fireEvent.click(screen.getByTestId("submit_button"));
        });
      });
      const currentDateStamp = new Date().toISOString().split("T")[0];
      expect(apiSpy).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/schedule/create`,
        {
          requested_activity_types: ["active", "social", "amusement"],
          requested_day_periods: ["morning"],
          schedule_date: expect.stringContaining(currentDateStamp),
        },
        {
          method: "POST",
        }
      );
    });
  });
  describe("when the api interests status response states the user has no recorded interests", () => {
    beforeEach(async () => {
      (api.default as jest.Mock).mockImplementation(() => ({
        status: 200,
        body: {
          status: Status.HAS_NO_INTERESTS,
        },
        json: () => ({
          status: Status.HAS_NO_INTERESTS,
        }),
      }));
    });
    it("redirects the user to the interests page", async () => {
      const apiSpy = jest.spyOn(api, "default");
      const history: MemoryHistory = renderComponentWithRouting().history;
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalled();
      });
      expect(history.location.pathname).toBe("/interests");
    });
  });
  describe("when the api interests status response states the user has recorded interests", () => {
    beforeEach(async () => {
      (api.default as jest.Mock).mockImplementation(() => ({
        status: 200,
        body: {
          status: Status.HAS_INTERESTS,
        },
        json: () => ({
          status: Status.HAS_INTERESTS,
        }),
      }));
    });
    it("redirects the user to the interests page", async () => {
      const apiSpy = jest.spyOn(api, "default");
      const history: MemoryHistory = renderComponentWithRouting().history;
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalled();
      });
      expect(history.location.pathname).toBe("/");
    });
  });
});
