import { authService } from '../fbase';
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Login() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
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
        <Div>
            Welcome!
            <img id="logo" src="img/bookmark.png" alt="" />
            <LoginBtn onClick={loginHandler}>
                <Img id="google" src="img/google.png" alt="" />
                Google Login
            </LoginBtn>
        </Div>
    );
}

export default Login;

const Div = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
`

const Img = styled.img`
    vertical-align: middle;
    margin-right: 10px;
`

const LoginBtn = styled.button`
    margin-top:50px;
    width:300px;
    height:50px;
    border:0px;
    border-radius:0px;
    box-shadow: 5px 5px 5px rgba(133, 133, 133, 0.3);
`