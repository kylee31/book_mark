import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Title = styled.h1`
    text-align:center;
    margin-top:20px;
`;

export default function Header() {

    const [theme, setTheme] = useState("light");

    function myTheme() {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
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
        </div>
    );
}