import React from 'react';
import GoogleLogin from "react-google-login";

const responseGoogle = (response: any) => {
  console.log(response);
}

const LoginForm = () => (
  <GoogleLogin
    clientId="518308412629-vinr3kn5tallebp0qfup4d00nddgpb4s.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
)

export default LoginForm
