import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MyCate from './pages/MyCate';
import Header from './component/Header';
import AddCate from './pages/AddCate';
import MainPage from "./pages/MainPage";
import WrongPage from "./pages/WrongPage";
import ScrollTop from './util/ScrollTop';

import { auth } from './fbase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import styled from "styled-components";

const Login = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:300px;
`;

function App() {

  const [userData, setUserData] = useState(null);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        //console.log(data) // console로 들어온 데이터 표시
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <BrowserRouter>
      <ScrollTop />
      <Header login={userData} />
      {userData ? null : <Login><button onClick={handleGoogleLogin}>Log-in🔒</button></Login>}
      {userData ?
        < Routes >
          <Route index path="/" element={<MainPage />} />
          <Route path="/blog/:name" element={<MyCate />} />
          <Route path="/createblog" element={<AddCate />} />
          <Route path="/*" element={<WrongPage />} />
        </Routes> : null
      }
    </BrowserRouter >
  );
}

export default App;
