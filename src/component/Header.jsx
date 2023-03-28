import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../fbase";

const AddBlogButton = styled.button`
    background-color:blue;
    color:white;
    &+&{
        margin-left:20px;
    }
`;

export default function Header() {
    const navigate = useNavigate();
    function createBlog() {
        navigate(`/createblog`);
    }

    function logout() {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            authService.signOut()
            navigate(`/`)
        }
        else {
        }
    }

    function main() {
        //console.log(authService.currentUser);
        authService.currentUser !== null ? navigate(`/main`) : <></>
    }

    return (
        <Div>
            <Title><span onClick={main}>BOOK-MARK</span></Title>
            {
                authService.currentUser ?
                    <div>
                        <AddBlogButton onClick={createBlog}>카테고리 생성</AddBlogButton>
                        <AddBlogButton onClick={logout}>로그아웃</AddBlogButton>
                    </div> : null
            }
        </Div>
    );
}

//styled-components
const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:150px;
    min-width:900px;
`;

const Title = styled.span`
    font-size:2rem;
    margin-bottom:20px;
    cursor:pointer;
`;

