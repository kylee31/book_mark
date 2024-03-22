import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MyCate from './pages/MyCate';
import AddCate from './pages/AddCate';
import MainPage from "./pages/MainPage";
import WrongPage from "./pages/WrongPage";
import Login from "./pages/Login";
import Layout from "./styles/Layout";
import PrivateRoute from "./util/PrivateRoute";

export default function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="/cate/:name" element={<PrivateRoute><MyCate /></PrivateRoute>} />
          <Route path="/createcate" element={<PrivateRoute><AddCate /></PrivateRoute>} />
          <Route path="/main/*" element={<WrongPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}