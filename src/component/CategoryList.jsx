//import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { getDocs, collection, query, where } from 'firebase/firestore'
import { authService, db } from '../fbase';
import Loading from "../util/Loading";

function CategoryList() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [userUid, setUserUid] = useState("");
    const cate = collection(db, 'cate');
    const arr = [];

    useEffect(() => {

        async function getInfo() {
            //로그인한 user의 uid 찾아서 cate 데이터 읽어오기
            await authService.onAuthStateChanged(user => {
                if (user) {
                    setUserUid(authService.currentUser.uid);
                }
                else { }
            })
            const myData = query(cate, where("uid", "==", userUid));
            const querySnapshot = await getDocs(myData);
            await querySnapshot.forEach((doc) => {
                arr.push(doc.data())
            });
            setData(arr.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
            setIsLoading(false);
        }
        getInfo();
    }, [userUid]);

    return (
        <>
            <Span>CATEGORY</Span>
            <Box>
                {isLoading ? <Loading isLoading={isLoading} /> : data.map((item, index) => {
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