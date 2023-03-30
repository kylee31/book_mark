import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MyCate from './pages/MyCate';
import AddCate from './pages/AddCate';
import MainPage from "./pages/MainPage";
import WrongPage from "./pages/WrongPage";
import Login from "./util/Login";
import Layout from "./util/Layout";
import PrivateRoute from "./util/PrivateRoute";

export default function App() {

  /*interface RouterElement {
    id: number // 페이지 아이디 (반복문용 고유값)
    path: string // 페이지 경로
    label: string // 사이드바에 표시할 페이지 이름
    element: React.ReactNode // 페이지 엘리먼트
    withAuth?: boolean // 인증이 필요한 페이지 여부
  }

  const routerData = [

    {
      id: 0,
      path: '/',
      element: <Login />,
      withAuth: false,
    },

    {
      id: 1,
      path: '/main',
      element: <MainPage />,
      withAuth: true
    },
    {
      id: 2,
      path: '/cate/:name',
      element: <MyCate />,
      withAuth: true
    },
    {
      id: 3,
      path: '/createcate',
      element: <AddCate />,
      withAuth: true
    },
    {
      id: 4,
      path: '/*',
      element: <WrongPage />,
      withAuth: false
    }
  ]*/

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="/cate/:name" element={<PrivateRoute><MyCate /></PrivateRoute>} />
          <Route path="/createcate" element={<PrivateRoute><AddCate /></PrivateRoute>} />
          <Route path="/*" element={<WrongPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}