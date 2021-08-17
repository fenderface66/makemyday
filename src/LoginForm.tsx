import React from 'react';
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import api from "./api";

const LoginForm = () => {
  let history = useHistory();
  const onLoginSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (response.code) {
      return;
    }
    Cookies.set('user', JSON.stringify({
      ...(response as GoogleLoginResponse).profileObj,
      accessToken: (response as GoogleLoginResponse).accessToken,
    }), { expires: 365 })
    await api(`${process.env.REACT_APP_API_URL}/google/authenticate`, {
      token: (response as GoogleLoginResponse).accessToken
    }, {
      method: 'POST'
    })
    history.push('/');
  }

  const onLoginFailure = (response: any) => {
    console.log(response);
  }

  return <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
    buttonText="Login"
    onSuccess={onLoginSuccess}
    onFailure={onLoginFailure}
    cookiePolicy={'single_host_origin'}
    scope="https://www.googleapis.com/auth/calendar"
  />
}

export default LoginForm
