import React from "react";
import { Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

const Div=styled.div`
    margin:0 180px;
    h1{
        text-align:center;
        margin-top:40px;  
    }
`

const AddBlogButton=styled.button`
    float:right;
    background-color:blue;
    color:white;
    &+&{
        margin-right:20px;
    }
`;

export default function Header() {
    const history=useNavigate();

    function AddBlog(){
        history("/createblog")
    }

    return (
        <Div>
            <h1><Link to="/">COMMENT BLOG</Link></h1>
            <AddBlogButton onClick={AddBlog}>blog 만들기</AddBlogButton>
            <AddBlogButton onClick={()=>{}}>로그인</AddBlogButton>
        </Div>
    );
}