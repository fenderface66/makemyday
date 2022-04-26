import React from "react";
import * as api from "../../api";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import Schedule from "./index";
import { act } from "react-dom/test-utils";

const testSchedule = [
  {
    name: "Go on a hike",
    startDateTime: "2021-11-13T09:00:00.000+00:00",
    endDateTime: "2021-11-13T14:00:00.000+00:00",
  },
  {
    name: "Play video games",
    startDateTime: "2021-11-13T14:00:00.000+00:00",
    endDateTime: "2021-11-13T15:00:00.000+00:00",
  },
  {
    name: "Go for a run",
    startDateTime: "2021-11-13T15:00:00.000+00:00",
    endDateTime: "2021-11-13T15:30:00.000+00:00",
  },
  {
    name: "Do a jigsaw puzzle",
    startDateTime: "2021-11-13T15:30:00.000+00:00",
    endDateTime: "2021-11-13T17:30:00.000+00:00",
  },
  {
    name: "Go for a walk",
    startDateTime: "2021-11-13T17:30:00.000+00:00",
    endDateTime: "2021-11-13T18:00:00.000+00:00",
  },
];

const testRequestedDayPeriods = ["morning", "afternoon"];
const testRequestedActivityTypes = ["active", "social"];

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    state: {
      schedule: testSchedule,
      requested_day_periods: testRequestedDayPeriods,
      requested_activity_types: testRequestedActivityTypes,
    },
  }),
}));

describe("<Schedule />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("When the Confirm button is clicked", () => {
    it("makes a call to the /schedule/confirm endpoint with the schedule", async () => {
      const apiSpy = jest.spyOn(api, "default");
      const { getByTestId } = render(<Schedule />);
      const confirmButton = getByTestId("confirm_button");
      fireEvent.click(confirmButton);
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith(
          `${process.env.REACT_APP_API_URL}/schedule/confirm`,
          testSchedule,
          {
            method: "POST",
          }
        );
      });
    });
  });
  describe("When the recreate button is clicked", () => {
    it("makes a call to the /schedule/confirm endpoint with the schedule", async () => {
      const apiSpy = jest.spyOn(api, "default");
      const { getByTestId } = render(<Schedule />);
      const confirmButton = getByTestId("recreate_button");
      fireEvent.click(confirmButton);
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith(
          `${process.env.REACT_APP_API_URL}/schedule/create`,
          {
            requested_day_periods: testRequestedDayPeriods,
            requested_activity_types: testRequestedActivityTypes,
          },
          {
            method: "POST",
          }
        );
      });
    });
  });
  describe("When the delete button is clicked", () => {
    it("removes the relevant activity from the schedule", async () => {
      const apiSpy = jest.spyOn(api, "default");
      const { getByTestId, queryByTestId } = render(<Schedule />);
      const runningActivity = getByTestId("go for a run");
      const deleteButton = within(runningActivity).getByTestId("delete-icon");
      const testScheduleWithoutRunningActivity = testSchedule.filter(
        (schedule) => schedule.name !== "Go for a run"
      );
      fireEvent.click(deleteButton);
      await waitFor(() => {
        expect(queryByTestId("go for a run")).not.toBeInTheDocument();
      });

      const confirmButton = getByTestId("confirm_button");
      fireEvent.click(confirmButton);
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith(
          `${process.env.REACT_APP_API_URL}/schedule/confirm`,
          testScheduleWithoutRunningActivity,
          {
            method: "POST",
          }
        );
      });
    });
  });
});
