import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isLogin } from "../util/isLogin";

export default function Header() {
    const navigate = useNavigate();
    const loc = useLocation();

    function main() {
        if (isLogin() && loc.pathname !== '/') {
            navigate(`/main`);
            console.log()
        }
        else { }
    }

    return (
        <Div>
            <Title><span onClick={main}>BOOK-MARK</span></Title>
        </Div>
    );
}

//styled-components
const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:100px;
    min-width:900px;
`;

const Title = styled.span`
    font-size:2rem;
    cursor:pointer;
`;

