import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import api from "../../api";
import useUserCookie from "../../hooks/useUserCookie";
import Card from "../../components/Card";
import CloseIconButton from "../../components/CloseIconButton";
import SubTitle from "../../components/SubTitle";
type LocationState = {
  schedule: ScheduleActivity[];
  requested_day_periods: (
    | "morning"
    | "afternoon"
    | "early_evening"
    | "late_evening"
  )[];
  requested_activity_types: (
    | "active"
    | "social"
    | "amusement"
    | "self_improvement"
    | "outgoing"
  )[];
  schedule_date: string;
};

export type ScheduleActivity = {
  name: string;
  startDateTime: string;
  endDateTime: string;
};

const Schedule = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [schedule, setSchedule] = useState<ScheduleActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getUserFromCookie = useUserCookie();
  const user = getUserFromCookie();
  const activityTimeFormat = new Intl.DateTimeFormat("en", {
    minute: "numeric",
    hour: "numeric",
  });
  const dayTimeFormat = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  useEffect(() => {
    setSchedule(location.state.schedule);
  }, [location.state.schedule]);
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
        <Container>
          <Card>
            {schedule.length ? (
              <>
                <Typography variant="h4">
                  Schedule for{" "}
                  {dayTimeFormat.format(new Date(schedule[0].startDateTime))}
                </Typography>
                {schedule.map((scheduleActivity) => (
                  <Box
                    data-testid={scheduleActivity.name.toLowerCase()}
                    key={scheduleActivity.name}
                    sx={{
                      my: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "spaced-between",
                        width: "100%",
                      }}
                    >
                      <SubTitle>{scheduleActivity.name}</SubTitle>
                      <CloseIconButton
                        data-testid="delete-icon"
                        onClick={() => {
                          const newSchedule = schedule.filter(
                            (scheduleItem) =>
                              scheduleItem.name !== scheduleActivity.name
                          );
                          setSchedule(newSchedule);
                        }}
                      />
                    </Box>
                    <Typography paragraph>
                      {activityTimeFormat.format(
                        new Date(scheduleActivity.startDateTime)
                      )}{" "}
                      -{" "}
                      {activityTimeFormat.format(
                        new Date(scheduleActivity.endDateTime)
                      )}
                    </Typography>
                  </Box>
                ))}
                <Grid container spacing={2}>
                  <Grid item>
                    <LoadingButton
                      data-testid="confirm_button"
                      loading={loading}
                      onClick={async () => {
                        setLoading(true);
                        const res = await api(
                          `${process.env.REACT_APP_API_URL}/schedule/confirm`,
                          schedule,
                          {
                            method: "POST",
                          }
                        );
                        setLoading(false);
                        if (res.status === 201) {
                          history.push("/complete", {
                            scheduleType: "calendar",
                          });
                        }
                      }}
                      size="large"
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Confirm as schedule
                    </LoadingButton>
                  </Grid>
                  {user.todoistAccessToken ? (
                    <Grid item>
                      <LoadingButton
                        data-testid="confirm_button_todoist"
                        loading={loading}
                        onClick={async () => {
                          setLoading(true);
                          const res = await api(
                            `${process.env.REACT_APP_API_URL}/todoist/create`,
                            {
                              schedule,
                              todoist_access_token: user.todoistAccessToken,
                            },
                            {
                              method: "POST",
                            }
                          );
                          setLoading(false);
                          if (res.status === 201) {
                            history.push("/complete", {
                              scheduleType: "todo",
                            });
                          }
                        }}
                        size="large"
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Confirm as to-do list
                      </LoadingButton>
                    </Grid>
                  ) : null}
                  <Grid item>
                    <LoadingButton
                      data-testid="recreate_button"
                      loading={loading}
                      onClick={async () => {
                        setLoading(true);
                        const res = await api(
                          `${process.env.REACT_APP_API_URL}/schedule/create`,
                          {
                            requested_day_periods:
                              location.state.requested_day_periods,
                            requested_activity_types:
                              location.state.requested_activity_types,
                            schedule_date: location.state.schedule_date,
                          },
                          {
                            method: "POST",
                          }
                        );
                        if (res.status === 201) {
                          const schedule = await res.json();
                          setSchedule(schedule);
                        }
                        setLoading(false);
                      }}
                      size="large"
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Recreate
                    </LoadingButton>
                  </Grid>
                </Grid>
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Schedule;
