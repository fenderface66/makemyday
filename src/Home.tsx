import React, {FunctionComponent, useEffect, useState} from 'react';
import request from 'superagent'
import { withRouter, useHistory } from 'react-router';
import { SecureStorage } from './SecureStorage';
import ChooseCalendar from "./ChooseCalendar";

export type Calendar = {
  id: string;
  summary: string;
  backgroundColor: string;
}

const getCalendarsEvents = async () : Promise<Calendar[]> => {
  const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  const response = await request
    .get(url)
    .set('Authorization', `Bearer ${SecureStorage.get('token')}`)
  console.log(response.body.items);
  return response.body.items;
};


const Home: FunctionComponent = () => {
  const history = useHistory();
  const hasToken = !!SecureStorage.get('token');
  if (!hasToken) {
    history.push('/login');
  }
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | undefined>(undefined);

  useEffect(() => {
    // Create an scoped async function in the hook
    (async () => {
      const calendars = await getCalendarsEvents();
      setCalendars(calendars);
    })();
  }, []);

  return (
    <>
      {selectedCalendar ? <h1>The selected calendar {selectedCalendar.summary}</h1> : null}
      <ChooseCalendar
        onSelect={(selectedCalendar: Calendar) => setSelectedCalendar(selectedCalendar)}
        calendars={calendars}
      />
    </>
  )
}

export default withRouter(Home);
