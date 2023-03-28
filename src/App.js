import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MyCate from './pages/MyCate';
import Header from './component/Header';
import AddCate from './pages/AddCate';
import MainPage from "./pages/MainPage";
import WrongPage from "./pages/WrongPage";
import ScrollTop from './util/ScrollTop';
import Login from "./util/Login";
import Layout from "./util/Layout";

export default function App() {

  return (
    <BrowserRouter>
      <ScrollTop />
      <Layout>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/blog/:name" element={<MyCate />} />
          <Route path="/createblog" element={<AddCate />} />
          <Route path="/*" element={<WrongPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}