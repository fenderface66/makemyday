import React from 'react'
import {useLocation} from "react-router";

type LocationState = {
  scheduleType: 'calendar' | 'todo';
}

const Complete = () => {
  const location = useLocation<LocationState>();
  return (
    <>
      <h1>You're schedule has been created</h1>
      <a href={location.state.scheduleType === 'calendar' ? "https://calendar.google.com/calendar" : "https://todoist.com/app/today"}>Click here to view it</a>
    </>
  )
};

export default Complete;
