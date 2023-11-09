import { authService } from '../fbase';
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, EmailAuthProvider, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Login() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [demo, setDemo] = useState("");
    const [demopw, setDemoPw] = useState("");

    useEffect(() => {
        if (userData) {
            //로그인 여부 저장 token
            localStorage.setItem('token', userData)
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
        setPersistence(authService, browserLocalPersistence)
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

    //testing 계정
    function handleChange(e) {
        setDemo(e.target.value)
    }
    function handleChangePw(e) {
        setDemoPw(e.target.value)
    }

    function handlerDemoAccount() {
        const auth = getAuth();
        demo !== "" && demopw !== "" ? signInWithEmailAndPassword(auth, demo, demopw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUserData(user.accessToken);
            })
            .catch((err) => {
                window.confirm("인증 실패")
                console.log(err)
            }) : window.confirm("모두 입력해주세요 (email: testing@email.com / password: testing)")
    }

    return (
        <Div>
            Welcome!
            <Pic id="logo" src="img/bookmark.png" alt="" />
            <LoginBtn onClick={loginHandler}>
                <Img id="google" src="img/google.png" alt="" />
                Google Login
            </LoginBtn>
            <Demo>
                <Input value={demo} onChange={handleChange} placeholder='email'></Input>
                <Input value={demopw} onChange={handleChangePw} placeholder='password'></Input>
                <LoginBtn onClick={handlerDemoAccount}>
                    Test
                    <div style={{ fontFamily: "Arial" }}>email: testing@email.com / pw: testing</div>
                </LoginBtn>
            </Demo>
        </Div>
    );
}

export default Login;

const Div = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
`

const Pic = styled.img`
    margin-bottom:5rem;
`

const Img = styled.img`
    vertical-align: middle;
    margin-right: 10px;
`

const Input = styled.input`
    width:300px;
    height:20px;
    border:1px solid gray;    
    font-family:'Arial';

`

const LoginBtn = styled.button`
    width:300px;
    height:50px;
    border:0px;
    border-radius:0px;
    box-shadow: 5px 5px 5px rgba(133, 133, 133, 0.3);
`

const Demo = styled.div`
    width:300px;
    height:100px;
    margin-top:2rem;
`