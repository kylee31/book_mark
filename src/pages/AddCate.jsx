import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "../component/Profile";
import { getDocs, collection, setDoc, doc } from 'firebase/firestore'
import { db } from '../fbase';
import { useSelector } from "react-redux";

function AddCate() {

    const navigate = useNavigate();

    const [name, setName] = useState("💬");
    const [color, setColor] = useState("");
    const [img, setImg] = useState("https://ifh.cc/g/PDPkX5.png");
    const [nameList, setNameList] = useState([]);
    const [same, setSame] = useState(false);
    const [newId, setId] = useState(0);

    const { userUid } = useSelector(state => state.uid);
    const { cateData } = useSelector(state => state.cate);

    const cate = collection(db, 'cate');

    //카테고리 데이터 생성하기
    async function addInfo() {
        const newData = {
            name: name,
            color: color,
            img: img,
            uid: userUid
        }
        if (name !== "💬" && color !== "" && same === false) {
            await setDoc(doc(cate, String(newId)), newData); //문서이름을 id로 지정
            await alert("생성 완료! 새로운 카테고리에 북마크 저장하세요");
            await navigate(`/main`);
        }
        else if (same === true) alert("동일한 이름이 존재합니다! 다른 이름으로 작성해주세요");
        else alert("ID와 Color 모두 작성해주세요!");
    }

    //cate 마지막 문서 id newId에 저장
    useEffect(() => {
        async function setNewId() {
            const lastId = await getDocs(cate);
            await setId(Number(lastId.docs[lastId.size - 1].id) + 1)
        }
        setNewId();

        async function setName() {
            let arr = [];
            cateData.forEach((d) => arr.push(d.name))
            setNameList(arr)
        }
        setName();
    }, [cateData]);

    //링크를 동일한 이름으로 찾기 때문에 동일한 카테고리 생성불가
    useEffect(() => {
        for (let i = 0; i < nameList.length; i++) {
            if (nameList[i] === name) { setSame(true); break; }
            else setSame(false)
        }
    }, [same, myName]);

    function myName(e) {
        setName(e.target.value);
        if (e.target.value === "") setName("💬");
    }

    function myColor(e) {
        setColor((e.target.value).replace("#", ""));
    }

    function myImg(e) {
        let reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = () => {
            const previewImgUrl = reader.result;
            setImg(previewImgUrl);
        }
    }

    return (
        <div>
            <AddCategory>
                <label>IMG선택 <input type="file" accept="image/*" onChange={myImg} /></label>
                <label>카테고리 입력 <input height="20px" type="text" maxLength="10" onChange={myName} /></label>
                <label>COLOR선택 <input type="color" onChange={myColor} /></label>
            </AddCategory>
            <Blog $color={`#${color}`}>
                <Profile myname={name} img={img} /><br />
                <Div>
                    <Bookmark>
                        {/*링크 예제 이미지 수정 필요*/}
                        <Span>예시(생성될 카테고리 미리보기)</Span>
                        <DelSpan>북마크 설명란 ❌</DelSpan>
                    </Bookmark>
                </Div>
            </Blog>
            <Button>
                <button onClick={addInfo}>저장하기</button>
            </Button>
        </div>
    );
}

export default AddCate;

//styled-components
const AddCategory = styled.div`
    background-color: lightgrey;
    padding: 20px;
    margin: 0px auto;
    width: 860px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:10px;
    @media screen and (max-width:600px){
        width:500px;
        flex-direction:column;
        padding:10px 0;
    }
`;

const Div = styled.div`
    margin: 40px;
    width: 600px;
    height: 150px;
    @media screen and (max-width:600px){
        width:400px;
    }
`;

const Bookmark = styled.div`
    background-color: #fff;
    border-radius:5px;
`;

const Span = styled.span`
    padding:0 5px;
`

const DelSpan = styled(Span)`
    border-left: 2px solid grey;
    color: grey;
`

const Button = styled.p`
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom:30px;
`;

const Blog = styled.div`
    margin:auto;
    margin-bottom: 50px;
    display:flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    width:900px;
    min-height:450px;
    border-radius: 20px;
    box-shadow: 8px 8px 5px rgba(133, 133, 133, 0.3);
    background-color: #e0f1ff;
    background-color:${props => props.$color};
    @media screen and (max-width:600px){
        width:500px;
    }
`;