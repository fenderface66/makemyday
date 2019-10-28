import React, {FunctionComponent, useEffect} from 'react';
import request from "superagent";
import {SecureStorage} from "./SecureStorage";
import {Calendar} from "./Home";
import { DateTime } from 'luxon';
import ChooseDayPreferences from "./ChooseDayPreferences";

type Props = {
  calendarId: string;
}

const getCalendarEvents = async (calendarId: string) : Promise<Calendar[]> => {
  const startOfDay = DateTime.fromObject({ hour: 0 }).toISO({
    suppressMilliseconds: true,
  });
  const endOfDay = DateTime.fromObject({ hour: 23, minute: 59}).toISO({
    suppressMilliseconds: true,
  });
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
  const response = await request
    .get(url)
    .query({
      timeMin: startOfDay,
      timeMax: endOfDay
    })
    .set('Authorization', `Bearer ${SecureStorage.get('token')}`)
  return response.body.items;
};

const SelectedCalendar: FunctionComponent<Props> = ({
  calendarId
}) => {
  useEffect(() => {
    // Create an scoped async function in the hook
    (async () => {
      const events = await getCalendarEvents(calendarId);
    })();
  }, []);
  return (
    <ChooseDayPreferences />
  );
};

export default SelectedCalendar;
