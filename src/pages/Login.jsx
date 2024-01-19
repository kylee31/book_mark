import { authService } from '../fbase';
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Login() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [account, setAccount] = useState({
        demo: "",
        demopw: ""
    });

    useEffect(() => {
        async function setUserData() {
            if (userData) {
                //로그인 여부 저장 token (accessToken)
                await localStorage.setItem('token', userData)
                await navigate(`/main`)
            }
            else {
                navigate(`/`)
            }
        }
        setUserData();
    }, [userData])


    //1. google 로그인
    function loginHandler() {
        // provider를 구글로 설정
        const provider = new GoogleAuthProvider();
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

    //2. testing 계정
    function handleChange(e) {
        const { value, name } = e.target;
        setAccount({
            ...account,
            [name]: value
        })
    }
    function handlerDemoAccount() {
        (account.demo !== "" && account.demopw !== "") ?
            signInWithEmailAndPassword(authService, account.demo, account.demopw)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const token = user.accessToken;
                    setUserData(token);
                })
                .catch((err) => {
                    window.confirm("인증 실패")
                    console.log(err)
                }) : window.confirm("모두 입력해주세요 (email: testing@email.com / password: testing)")
    }
    function handleClick(e) {
        if (e.keyCode === 13) {
            handlerDemoAccount();
        }
    }

    return (
        <Div>
            Welcome!
            <Pic id="logo" src="img/bookmark.png" alt="" loading="lazy" />
            <LoginBtn onClick={loginHandler}>
                <Img id="google" src="img/google.png" alt="" loading="lazy" />
                Google Login
            </LoginBtn>
            <Demo>
                <Input name="demo" value={account.demo} onChange={handleChange} placeholder='email'></Input>
                <Input name="demopw" value={account.demopw} onChange={handleChange} placeholder='password' onKeyDown={handleClick}></Input>
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