import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MyCate from './pages/MyCate';
import AddCate from './pages/AddCate';
import MainPage from "./pages/MainPage";
import WrongPage from "./pages/WrongPage";
import Login from "./util/Login";
import Layout from "./util/Layout";

export default function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/cate/:name" element={<MyCate />} />
          <Route path="/createcate" element={<AddCate />} />
          <Route path="/*" element={<WrongPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}