import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MyCate from './pages/MyCate';
import Header from './component/Header';
import AddBlog from './pages/AddBlog';
import ScrollTop from './util/ScrollTop';
import MainPage from "./pages/MainPage";
import WrongPage from "./pages/WrongPage";

function App() {

  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <Routes>
        <Route index path="/" element={<MainPage />} />
        <Route path="/blog/:name" element={<MyCate />} />
        <Route path="/createblog" element={<AddBlog />} />
        <Route path="/*" element={<WrongPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
