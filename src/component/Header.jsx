import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isLogin } from "../util/isLogin";
import { getAuth } from "firebase/auth";

function Header() {
    const navigate = useNavigate();
    const loc = useLocation();

    const auth = getAuth().currentUser;

    function main() {
        if (isLogin() && loc.pathname !== '/') {
            navigate(`/main`);
            console.log()
        }
        else { }
    }

    return (
        <Div>
            <Title><span onClick={main}>{auth !== null ? (auth.displayName) + "'S " : ""}BOOK-MARK</span></Title>
        </Div>
    );
}

export default Header;

//styled-components
const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:100px;
`;

const Title = styled.span`
    font-size:2rem;
    cursor:pointer;
`;

