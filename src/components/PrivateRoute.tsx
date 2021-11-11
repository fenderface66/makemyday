import React from 'react';
import {Route, Redirect, useHistory} from 'react-router-dom'
import {useEffect, useState} from "react";
import api from "../api";

const PrivateRoute = ({...props}) => {
  let history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  useEffect( () => {
    (async function() {
      try {
        await api(`${process.env.REACT_APP_API_URL}/google/tokenInfo`);
        return setIsAuthenticated(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [history])
  return isAuthenticated
    ? <Route { ...props } />
    : <Redirect to="/login" />
};

export default PrivateRoute;
