import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import Loading from "../util/Loading";
import { useSelector } from "react-redux";

function CategoryList() {

    const [isLoading, setIsLoading] = useState(true);
    const { cateData } = useSelector(state => state.cate)

    useEffect(() => {
        if (cateData) setIsLoading(false)
        // console.log(cateData)
    }, [cateData]);

    return (
        <>
            <Span>CATEGORY</Span>
            <Box>
                {isLoading ? <Loading isLoading={isLoading} /> : cateData.map((item, index) => {
                    return <CategoryItem key={index} img={item.img} name={item.name} color={item.color} />
                })}
            </Box>
        </>
    );
}

export default CategoryList;

//styled-compoentns
const Span = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:210px;
    height:40px;
    background-color:lightblue;
`;

const Box = styled.div`
    width:870px;
    min-height:250px;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    padding:0 15px;
    margin-bottom:40px;
    background-color:lightblue;
    @media screen and (max-width:600px){
        width:470px;
        grid-template-columns:repeat(2,1fr);
    }
`;