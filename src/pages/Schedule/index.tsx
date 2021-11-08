import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LoadingButton } from '@mui/lab';
import { useLocation } from "react-router-dom";
import api from "../../api";
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
            <Box sx={{
              my: 2
            }}>
              <h2>{scheduleActivity.name}</h2>
              <p>{activityTimeFormat.format(new Date(scheduleActivity.startDateTime))} - {activityTimeFormat.format(new Date(scheduleActivity.endDateTime))}</p>
            </Box>
          ))}
          <Grid container spacing={2}>
            <Grid item>
              <LoadingButton loading={loading} onClick={async () => {
                setLoading(true);
                const res = await api(`${process.env.REACT_APP_API_URL}/schedule/confirm`, schedule, {
                  method: 'POST',
                });
                setLoading(false);
                if (res.status === 201) {
                  history.push('/complete');
                }
              }} size="large" color="primary" variant="contained" type="submit">
                Confirm
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton loading={loading} onClick={async () => {
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
