import React, { FunctionComponent} from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { withRouter, RouteComponentProps, useHistory } from "react-router";

import { SecureStorage } from './SecureStorage';

type Props = RouteComponentProps;

const Login: FunctionComponent<Props> = () => {
    const history = useHistory();
    const responseGoogle = (response: GoogleLoginResponse) => {
        const token = response.getAuthResponse().access_token;
        SecureStorage.set('token', token);
        history.push('/');
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            buttonText="Login"
            onSuccess={(response: any) => responseGoogle(response)}
            onFailure={(e) => console.error(e)}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default withRouter(Login);
