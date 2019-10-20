import React, {FunctionComponent} from 'react';
import { withRouter, useHistory } from 'react-router';

import { SecureStorage } from './SecureStorage';

const Home: FunctionComponent = () => {
  const history = useHistory();
  const hasToken = !!SecureStorage.get('token');
  if (!hasToken) {
    history.push('/login');
  }
  return (
    <h1>You are logged in</h1>
  )
}

export default withRouter(Home);
