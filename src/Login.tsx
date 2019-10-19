import React, { FunctionComponent} from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import Keytar from 'keytar';

const Login: FunctionComponent = () => {
    const responseGoogle = (response: GoogleLoginResponse) => {
        console.log(response);
        Keytar.setPassword('google', response.getBasicProfile().getEmail(), JSON.stringify(response))
    }
    return (
        <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID as string}
            buttonText="Login"
            onSuccess={(response: any) => responseGoogle(response)}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default Login;
