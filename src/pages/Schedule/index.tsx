import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
type LocationState = { schedule: ScheduleActivity[]}

export type ScheduleActivity = {
  name: string;
  startDateTime: string;
  endDateTime: string;
};

const Schedule = () => {
  const location = useLocation<LocationState>();
  const [schedule, setSchedule] = useState<ScheduleActivity[]>([]);
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
    // TODO redirect if location.state.schedule contains no schedule activities
  }, [location]);
  console.log(schedule);
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
        </>
      ) : <h1>Loading...</h1>}
    </Container>
  )
}


export default Schedule;
