//import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { getDocs, collection, query, where } from 'firebase/firestore'
import { authService, db } from '../fbase';

function CategoryList() {

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
                //console.log(arr)
            });
            setData(arr.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
        }
        getInfo();
    }, [userUid]);

    return (
        <>
            <Logo>
                <Span>CATEGORY</Span>
            </Logo>
            <Box>
                {data.map((item, index) => {
                    return <CategoryItem key={index} img={item.img} name={item.name} color={item.color} />
                })}
            </Box>
        </>
    );
}

export default CategoryList;

//styled-compoentns
const Logo = styled.div`
    margin-right:700px;
`

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