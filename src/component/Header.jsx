import React from "react";
import { Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Title = styled.h1`
    text-align:center;
    margin-top:20px;
`;

const AddBlogButton=styled.button`
    float:right;
    margin-right:180px;
    background-color:blue;
    color:white;
`;

export default function Header() {
    const history=useNavigate();

    const [theme, setTheme] = useState("light");

    function myTheme() {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
    }

    function AddBlog(){
        history("/createblog")
    }

    return (
        <div>
            <Title><Link to="/">MINI BLOG</Link></Title>
            <p style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
            }}>
                <button onClick={myTheme} className={theme}>
                    {(theme === "dark") ? "다크 모드" : "라이트 모드"}
                </button>
            </p>
            <AddBlogButton onClick={AddBlog}>blog 만들기</AddBlogButton>
        </div>
    );
}