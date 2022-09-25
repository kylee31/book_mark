import { useState } from "react";
import { useLayoutEffect } from "react";
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
`;

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
    useLayoutEffect(() => {
        fetch(`https://book-marking.herokuapp.com/api/cusers`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const sortData = data.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
                setData(sortData);
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