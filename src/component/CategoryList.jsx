import axios from "axios";
import { useState } from "react";
import { useLayoutEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {

    const [data, setData] = useState([]);
    useLayoutEffect(() => {
        axios.get(`https://book-marking.herokuapp.com/users`)
            .then(res => {
                return res.data
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
                    return <CategoryItem key={index} img={item.img} name={item.name} color={item.color} />
                })}
            </Box>
        </>
    );
}

//styled-compoentns
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