import React from "react";
import { Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

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

    function AddBlog(){
        history("/createblog")
    }

    return (
        <div>
            <Title><Link to="/">COMMENT BLOG</Link></Title>
            <p style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
            }}>
            </p>
            <AddBlogButton onClick={AddBlog}>blog 만들기</AddBlogButton>
        </div>
    );
}