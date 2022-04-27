import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import api from "../api";
import useQuery from "../hooks/useQuery";
import Cookies from "js-cookie";
import useUserCookie from "../hooks/useUserCookie";

import todoistImg from "../assets/todoist-icon.png";
import styled from "styled-components";
import CenteredContainer from "./CenteredContainer";

const TodoistIcon = styled.img`
  height: 22px;
  margin-right: 5px;
`;

const Button = styled(LoadingButton)`
  background-color: #c3362a;
  &:hover {
    background-color: #b1362a;
  }
`;

const TodoistLoginButton = () => {
  const query = useQuery();
  const getUserFromCookie = useUserCookie();
  const [loading, setLoading] = useState<boolean>(false);
  const [integrated, setIntegrated] = useState<boolean>(false);
  useEffect(() => {
    const fetchAccessToken = async () => {
      const user = getUserFromCookie();
      if (user.todoistAccessToken) {
        return setIntegrated(true);
      }
      const code = query.get("code");
      const state = query.get("state");
      if (code && state === process.env.REACT_APP_TODOIST_STATE_SECRET) {
        const res = await api(
          "https://todoist.com/oauth/access_token",
          {
            client_id: process.env.REACT_APP_TODOIST_CLIENT_ID,
            client_secret: process.env.REACT_APP_TODOIST_CLIENT_SECRET,
            code,
          },
          {
            method: "POST",
          }
        );
        const data = await res.json();
        if (data.access_token) {
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              todoistAccessToken: data.access_token,
            })
          );
          setIntegrated(true);
        }
      }
    };
    fetchAccessToken().then();
  });
  return integrated ? (
    <CenteredContainer>
      <TodoistIcon src={todoistImg} />
      <h5 data-testid="todoist-integrated-message">Todoist is integrated</h5>
    </CenteredContainer>
  ) : (
    <Button
      data-testid="confirm_button_todoist"
      loading={loading}
      onClick={async () => {
        setLoading(true);
        window.location.assign(
          `https://todoist.com/oauth/authorize?client_id=${process.env.REACT_APP_TODOIST_CLIENT_ID}&scope=data:read_write,data:delete&state=${process.env.REACT_APP_TODOIST_STATE_SECRET}`
        );
        setLoading(false);
      }}
    >
      <TodoistIcon src={todoistImg} />
    </Button>
  );
};

export default TodoistLoginButton;
