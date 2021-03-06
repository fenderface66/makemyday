import React, {FunctionComponent, useEffect, useState} from 'react';
import request from 'superagent'
import { withRouter, useHistory } from 'react-router';
import { SecureStorage } from './SecureStorage';
import ChooseCalendar from "./ChooseCalendar";
import SelectedCalendar from "./SelectedCalendar";

export type Calendar = {
  id: string;
  summary: string;
  backgroundColor: string;
}

const Home: FunctionComponent = () => {
  const history = useHistory();
  const hasToken = !!SecureStorage.get('token');
  if (!hasToken) {
    history.push('/login');
  }

  const getCalendars = async () => {
    const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList`
    try {
      const response = await request
        .get(url)
        .set('Authorization', `Bearer ${SecureStorage.get('token')}`)
      return response.body.items;
    } catch(e) {
      if (e.status === 401) {
        history.push('/login');
      }
      throw e;
    }
  };

  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | undefined>(undefined);


  useEffect(() => {
    // Create an scoped async function in the hook
    (async () => {
      const calendars = await getCalendars();
      setCalendars(calendars);
    })();
  }, []);

  return (
    <>
      {selectedCalendar ? <SelectedCalendar calendarId={selectedCalendar.id} /> : (
        <ChooseCalendar
          onSelect={(selectedCalendar: Calendar) => setSelectedCalendar(selectedCalendar)}
          calendars={calendars}
        />
      )}
    </>
  )
}

export default withRouter(Home);
