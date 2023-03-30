import { authService } from '../fbase';
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function Login() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        //return userData ? navigate(`/main`) : navigate(`/`)
        if (userData) {
            //로그인 여부 저장 token
            sessionStorage.setItem('token', userData)
            navigate(`/main`)
        }
        else {
            navigate(`/`)
        }
    }, [userData])

    function loginHandler() {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        //로그인 후 계정이 바로 연동되는 상황 방지
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        setPersistence(authService, browserSessionPersistence)
            .then(() => {
                return signInWithPopup(authService, provider) // popup을 이용한 signup
                    .then((data) => {
                        const credential = GoogleAuthProvider.credentialFromResult(data);
                        const token = credential.accessToken;
                        setUserData(token); // user data 설정
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                console.log(error)
            });

    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            Welcome!<br />
            <button onClick={loginHandler}>Login</button>
        </div>
    );
}

export default Login;