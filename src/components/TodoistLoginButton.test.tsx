import { act, render, screen, waitFor } from "@testing-library/react";
import Cookies from "js-cookie";
import TodoistLoginButton from "./TodoistLoginButton";
import * as api from "../api";

jest.mock("../hooks/useQuery", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    get: (search: string) =>
      ({
        state: "test_state",
        code: "test_code",
      }[search]),
  })),
}));

describe("<TodoistLoginButton />", () => {
  let cookieSpy: jest.SpyInstance;
  let apiSpy: jest.SpyInstance;
  beforeAll(() => {
    process.env.REACT_APP_TODOIST_STATE_SECRET = "test_state";
    process.env.REACT_APP_TODOIST_CLIENT_ID = "test_client_id";
    process.env.REACT_APP_TODOIST_CLIENT_SECRET = "test_client_secret";
  });
  describe("when no user cookie with a Todoist access token is present", () => {
    beforeEach(() => {
      apiSpy = jest.spyOn(api, "default");
      apiSpy.mockResolvedValue({
        json: () => ({
          access_token: "test_access_token",
        }),
      });
    });
    it("shows a button for the user to integrate with todoist", () => {
      const { getByTestId } = render(<TodoistLoginButton />);
      const button = getByTestId("confirm_button_todoist");
      expect(button).toBeDefined();
    });
    describe("when button is clicked", () => {
      const originalLocation = window.location;
      const assignMock = jest.fn();
      beforeEach(async () => {
        // @ts-ignore
        delete window.location;
        window.location = {
          ...originalLocation,
          assign: assignMock,
        } as Location;
        act(() => {
          render(<TodoistLoginButton />);
          screen.getByTestId("confirm_button_todoist").click();
        });
      });
      it("redirects the user to the todoist oAuth page", () => {
        expect(assignMock).toHaveBeenCalledWith(
          `https://todoist.com/oauth/authorize?client_id=${process.env.REACT_APP_TODOIST_CLIENT_ID}&scope=data:read_write,data:delete&state=${process.env.REACT_APP_TODOIST_STATE_SECRET}`
        );
      });
      afterEach(() => {
        window.location = originalLocation;
      });
    });
  });
  describe("when the user has been redirected with a code & state", () => {
    beforeEach(() => {
      apiSpy = jest.spyOn(api, "default");
      apiSpy.mockResolvedValue({
        json: () => ({
          access_token: "test_access_token",
        }),
      });
    });
    it("fetches an access token from todoist", () => {
      act(() => {
        render(<TodoistLoginButton />);
        expect(apiSpy).toHaveBeenCalledWith(
          "https://todoist.com/oauth/access_token",
          {
            client_id: "test_client_id",
            client_secret: "test_client_secret",
            code: "test_code",
          },
          {
            method: "POST",
          }
        );
      });
    });
  });
  describe("when a user cookie is present with a Todoist access token", () => {
    beforeEach(() => {
      cookieSpy = jest.spyOn(Cookies, "get");
      cookieSpy.mockImplementation(() =>
        JSON.stringify({
          accessToken: "test_token",
          todoistAccessToken: "test_token",
        })
      );
      apiSpy = jest.spyOn(api, "default");
      apiSpy.mockResolvedValue({
        json: () => ({
          access_token: "test_access_token",
        }),
      });
    });
    it("does not display the integration button", () => {
      act(() => {
        render(<TodoistLoginButton />);
      });
      expect(screen.queryByTestId("confirm_button_todoist")).toBeNull();
    });
    it("tells the user that todoist is integrated", async () => {
      act(() => {
        render(<TodoistLoginButton />);
      });
      const text = screen.getByTestId("todoist-integrated-message");
      await waitFor(async () => {
        expect(text).toBeInTheDocument();
      });
    });
  });
});
