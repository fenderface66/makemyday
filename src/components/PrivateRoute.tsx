import React from 'react';
import {Route, Redirect, useHistory} from 'react-router-dom'
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import api from "../api";
import {User} from "../App";

const PrivateRoute = ({...props}) => {
  let history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  useEffect( () => {
    (async function() {
      try {
        const userCookie = Cookies.get('user');
        if (!userCookie) {
          return history.push('/login');
        }
        const user: User = JSON.parse(userCookie as string);
        const response = await api(`${process.env.REACT_APP_API_URL}/google/authenticate`, {
          token: user.accessToken,
        }, {
          method: 'POST'
        })
        if (response.status !== 201) {
          return history.push('/login');
        }
        return setIsAuthenticated(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])
  console.log(props);
  return isAuthenticated
    ? <Route { ...props } />
    : <Redirect to="/login" />
};

export default PrivateRoute;
