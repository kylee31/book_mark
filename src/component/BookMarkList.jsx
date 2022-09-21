import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import BookMarkItem from "./BookMarkItem";

const Span = styled.span`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0 auto;
    width:210px;
    height:40px;
    background-color:lightblue;
    font-weight:900;
`

const Box = styled.div`
    display:flex;
    flex-wrap:wrap;
    margin:0 auto;
    margin-bottom:40px;
    padding:10px;
    padding-left:30px;
    align-items:center;
    width:870px;
    min-height:250px;
    background-color:lightblue;
`;

export default function BookMarkList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/users`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data);
            })
    }, []);

    return (
        <>
            <div style={{ marginRight: "700px" }}>
                <Span>CATEGORY</Span>
            </div>
            <Box>
                {data.map((item, index) => {
                    return <BookMarkItem key={index} img={item.img} name={item.name} color={item.color} />
                })}
            </Box>
        </>
    );
}