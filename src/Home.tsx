import React, {FunctionComponent, useEffect, EffectCallback} from 'react';
import request from 'superagent'
import { withRouter, useHistory } from 'react-router';
import { SecureStorage } from './SecureStorage';

const getCalendarsEvents = async () => {
  const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  console.log(SecureStorage.get('token'));
  const response = request
    .get(url)
    .set('Authorization', `Bearer ${SecureStorage.get('token')}`)
    .end((err, resp) => {
      console.log(err);
      console.log(resp);
    })
};

const Home: FunctionComponent = () => {
  const history = useHistory();
  const hasToken = !!SecureStorage.get('token');
  if (!hasToken) {
    history.push('/login');
  }

  useEffect(() => {
    // Create an scoped async function in the hook
    (async () => {
      await getCalendarsEvents();
    })();
  }, []);

  return (
    <h1>You are logged in</h1>
  )
}

export default withRouter(Home);
