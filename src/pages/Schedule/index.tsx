import React, {useEffect, useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LoadingButton } from '@mui/lab';
import api from "../../api";
import {getUserFromCookie} from "../../cookie.util";
type LocationState = {
  schedule: ScheduleActivity[];
  requested_day_periods: ("morning" | "afternoon" | "early_evening" | "late_evening")[]
  requested_activity_types: ("active" | "social" | "amusement" | "self_improvement" | "outgoing")[]
}

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
  const user = getUserFromCookie();
  const activityTimeFormat = new Intl.DateTimeFormat('en', {
    minute: 'numeric',
    hour: 'numeric',
  });
  const dayTimeFormat = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  useEffect(() => {
    setSchedule(location.state.schedule);
  }, [location]);
  return (
    <Container>
      {schedule.length ? (
        <>
          <h1>Schedule for {dayTimeFormat.format(new Date(schedule[0].startDateTime))}</h1>
          {schedule.map(scheduleActivity => (
            <Box key={scheduleActivity.name} sx={{
              my: 2
            }}>
              <h2>{scheduleActivity.name}</h2>
              <p>{activityTimeFormat.format(new Date(scheduleActivity.startDateTime))} - {activityTimeFormat.format(new Date(scheduleActivity.endDateTime))}</p>
            </Box>
          ))}
          <Grid container spacing={2}>
            <Grid item>
              <LoadingButton data-testid="confirm_button" loading={loading} onClick={async () => {
                setLoading(true);
                const res = await api(`${process.env.REACT_APP_API_URL}/schedule/confirm`, schedule, {
                  method: 'POST',
                });
                setLoading(false);
                if (res.status === 201) {
                  history.push('/complete', {
                    scheduleType: 'calendar'
                  });
                }
              }} size="large" color="primary" variant="contained" type="submit">
                Confirm as schedule
              </LoadingButton>
            </Grid>
            {user.todoistAccessToken ? <Grid item>
              <LoadingButton data-testid="confirm_button_todoist" loading={loading} onClick={async () => {
                setLoading(true);
                const res = await api(`${process.env.REACT_APP_API_URL}/todoist/create`, {
                  schedule,
                  todoist_access_token: user.todoistAccessToken
                }, {
                  method: 'POST',
                });
                setLoading(false);
                if (res.status === 201) {
                  history.push('/complete', {
                    scheduleType: 'todo'
                  });
                }
              }} size="large" color="primary" variant="contained" type="submit">
                Confirm as to-do list
              </LoadingButton>
            </Grid> : null}
            <Grid item>
              <LoadingButton data-testid="recreate_button" loading={loading} onClick={async () => {
                setLoading(true);
                const res = await api(`${process.env.REACT_APP_API_URL}/schedule/create`, {
                  requested_day_periods: location.state.requested_day_periods,
                  requested_activity_types: location.state.requested_activity_types,
                }, {
                  method: 'POST',
                });
                if (res.status === 201) {
                  const schedule = await res.json();
                  setSchedule(schedule);
                }
                setLoading(false);
              }} size="large" color="primary" variant="contained" type="submit">
                Recreate
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      ) : <h1>Loading...</h1>}
    </Container>
  )
}


export default Schedule;
