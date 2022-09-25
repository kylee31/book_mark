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
        <Route index path="https://book-marking.herokuapp.com/" element={<MainPage />} />
        <Route path="https://book-marking.herokuapp.com/blog/:name" element={<MyCate />} />
        <Route path="https://book-marking.herokuapp.com/createblog" element={<AddBlog />} />
        <Route path="https://book-marking.herokuapp.com/*" element={<WrongPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
