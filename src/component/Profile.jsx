import React from "react";
import styled from "styled-components";

export default function Profile({ myname, img }) {

    return (
        <Div>
            <img src={img} alt="" />
            <p>{myname}<br />북마크</p>
        </Div>
    );
}

//styled-components
const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    margin-top:50px;
`;