import React, { useState, useLayoutEffect } from "react";
import Profile from "../component/Profile";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import LinkList from "../component/LinkList";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../fbase";
import Loading from "../util/Loading";
import { useSelector } from "react-redux";
import useGetCateData from "../hook/useGetCateData";
import useGetLinkData from "../hook/useGetLinkData";

function MyCate() {
    const location = useLocation();
    const myname = location.state.myname;
    const myimg = location.state.myimg;
    const mycolor = location.state.mycolor;

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [del, setDel] = useState(false);
    const [id, setId] = useState();

    const { userUid } = useSelector(state => state.uid);
    const { setCateLocalData } = useGetCateData(userUid);
    const flink = collection(db, 'link');
    const cate = collection(db, 'cate');

    const { data, setLinkLocalData } = useGetLinkData({ userUid, myname });

    //현재 카테고리 문서명 가져오기 (카테고리 삭제 위해서)
    useLayoutEffect(() => {
        async function getCateId() {
            const myData = query(cate, where("uid", "==", userUid));
            const querySnapshot = await getDocs(myData);
            await querySnapshot.forEach((doc) => {
                if (doc.data().name === myname) {
                    setId(doc.id);
                }
            });
        }
        getCateId();
    }, [])

    useLayoutEffect(() => {
        if (data) setIsLoading(false)
    }, [data])

    useLayoutEffect(() => {
        async function getLink() {
            await setLinkLocalData();
        }
        getLink()
    }, [del])

    //현재 카테고리 데이터 삭제하기
    async function onDelete() {
        if (window.confirm("카테고리를 삭제하시겠습니까? (삭제 시 포함되어 있는 링크 모두 삭제됩니다.)")) {
            const myData = query(flink, where("uid", "==", userUid));
            const querySnapshot = await getDocs(myData);
            await querySnapshot.docs.filter(d => d.data().name === myname).forEach((d) => {
                deleteDoc(doc(flink, String(d.data().id)));
            });
            await deleteDoc(doc(cate, id));
            await setLinkLocalData();
            await setCateLocalData();
            await navigate(`/main`);
        }
    }

    function onLocation() {
        navigate("/main");
    };

    return (
        <Blog $color={`#${mycolor}`}>
            <Profile myname={myname} img={myimg} /><br />
            <MyBookMark>
                {isLoading ? <Loading isLoading={isLoading} /> : <LinkList links={data} myname={myname} del={del} setDel={setDel} />}
            </MyBookMark>
            <Div>
                <Btn onClick={onLocation}>돌아가기</Btn>
                <DelBtn onClick={() => { onDelete(); }}>카테고리 삭제</DelBtn>
            </Div>
        </Blog>
    );
}

export default MyCate;

//styled-components
const MyBookMark = styled.div`
    width:600px;
    min-height:150px;
    margin: 20px;
    @media screen and (max-width:600px){
        width:400px;
    }
`;

const Blog = styled.div`
    margin-bottom: 50px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width:900px;
    min-height:450px;
    border-radius: 20px;
    box-shadow: 8px 8px 5px rgba(133, 133, 133, 0.3);
    background-color:${props => props.$color};
    @media screen and (max-width:600px){
        width:500px;
    }
`;

const Div = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:40px;
`;

const Btn = styled.button`
    height:30px;
`

const DelBtn = styled(Btn)`
    margin-left:20px;
`