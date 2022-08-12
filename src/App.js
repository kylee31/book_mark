import './App.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import MyBlog from './component/MyBlog';
import BlogList from './component/BlogList';
import Header from './component/Header';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<BlogList/>} />
        <Route path="/blog" element={<MyBlog/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
