import { Grid } from "@mui/material";
import React from "react";
import { useLocation, useHistory } from "react-router";
import Card from "../../components/Card";
import SubTitle from "../../components/SubTitle";

type LocationState = {
  scheduleType: "calendar" | "todo";
};

const Complete = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Card>
          <SubTitle>You're schedule has been created</SubTitle>
          <a
            rel="noreferrer"
            target="_blank"
            href={
              location.state.scheduleType === "calendar"
                ? "https://calendar.google.com/calendar"
                : "https://todoist.com/app/today"
            }
            onClick={() => history.push("/home")}
          >
            Click here to view it
          </a>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Complete;
