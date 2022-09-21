import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MyBlog from './pages/MyBlog';
import Header from './component/Header';
import AddBlog from './pages/AddBlog';
import ScrollTop from './component/ScrollTop';
import MainPage from "./pages/MainPage";
import WrongPage from "./pages/WrongPage";

function App() {

  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog/:name" element={<MyBlog />} />
        <Route path="/createblog" element={<AddBlog />} />
        <Route path="/*" element={<WrongPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
