import {BrowserRouter, Routes, Route,} from "react-router-dom";
import MyBlog from './pages/MyBlog';
import Header from './component/Header';
import AddBlog from './pages/AddBlog';
import ScrollTop from './component/ScrollTop';
import MainPage from "./pages/MainPage";

function App() {

  return (
    <BrowserRouter>
    <ScrollTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/blog/:name" element={<MyBlog/>}/>
        <Route path="/createblog" element={<AddBlog/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
