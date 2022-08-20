import './App.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import MyBlog from './component/MyBlog';
import BlogList from './component/BlogList';
import Header from './component/Header';
import AddBlog from './component/AddBlog';
import ScrollTop from './component/ScrollTop';

function App() {

  return (
    <BrowserRouter>
    <ScrollTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<BlogList/>} />
        <Route path="/blog/:name" element={<MyBlog/>}/>
        <Route path="/createblog" element={<AddBlog/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
