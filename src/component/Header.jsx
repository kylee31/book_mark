import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:150px;
    min-width:900px;
`;

const Title = styled.span`
    font-weight:900;
    font-size:2rem;
    margin-bottom:20px;
`;

const AddBlogButton = styled.button`
    background-color:blue;
    color:white;
    &+&{
        margin-left:20px;
    }
`;

export default function Header() {

    const history = useNavigate();
    function main() {
        history(`/createblog`);
    }
    return (
        <Div>
            <Title><Link to="/">BOOK-MARK⭐</Link></Title>
            <div style={{ marginLeft: "700px" }}>
                <AddBlogButton onClick={() => { }}>로그인</AddBlogButton>
                <AddBlogButton onClick={main}>카테고리 생성</AddBlogButton>
            </div>
        </Div>
    );
}