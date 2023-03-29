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
            //로그인 여부 저장
            localStorage.setItem('user', true)
            navigate(`/main`)
        }
        else {
            localStorage.setItem('user', false)
            navigate(`/`)
        }
    }, [userData])

    function Login() {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        setPersistence(authService, browserSessionPersistence)
            .then(() => {
                return signInWithPopup(authService, provider) // popup을 이용한 signup
                    .then((data) => {
                        setUserData(data.user); // user data 설정
                        //console.log(data) // console로 들어온 데이터 표시
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
            <button onClick={Login}>Login</button>
        </div>
    );
}

export default Login;