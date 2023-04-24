import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "../component/Profile";
import { getDocs, collection, query, where, setDoc, doc } from 'firebase/firestore'
import { authService, db } from '../fbase';

function AddCate() {

    const history = useNavigate();

    const [name, setName] = useState("💬");
    const [color, setColor] = useState("");
    const [img, setImg] = useState("https://ifh.cc/g/RxT0yX.png");
    const [nameList, setNameList] = useState([]);
    const [same, setSame] = useState(false);

    const [userUid, setUserUid] = useState("");
    const cate = collection(db, 'cate');
    const arr = [];
    const [newId, setId] = useState(0);


    useEffect(() => {
        //카테고리 데이터 가져오기
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
                arr.push(doc.data().name);
                setId(Number(doc.id));
            });
            setNameList(arr)
        }
        getInfo();
        /*
        axios.get(`http://localhost:3001/cate`)
            .then(res => {
                return res.data
            })
            .then(e => {
                setNameList(e.map((e) => {
                    return e.name;
                }))
            })*/
    }, [userUid]);

    //링크를 동일한 이름으로 찾기 때문에 동일한 카테고리 생성불가
    useEffect(() => {
        for (let i = 0; i < nameList.length; i++) {
            (nameList[i] === name) ? setSame(true) : setSame(false);
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

    async function addInfo() {
        //카테고리 데이터 생성하기
        if (name !== "💬" && color !== "" && same === false) {
            //문서이름을 id로 지정
            await setDoc(doc(cate, String(newId + 1)), {
                name: name,
                color: color,
                img: img,
                uid: userUid
            });
            await alert("생성 완료! 새로운 카테고리에 북마크 저장하세요");
            await history(`/main`);
            /*axios.post(`http://localhost:3001/cate`, {
                name,
                color,
                img
            })
                .then(res => {
                    alert("생성 완료! 새로운 카테고리에 북마크 저장하세요");
                    history(`/main`);
                });*/
        }
        else if (same === true) alert("동일한 이름이 존재합니다! 다른 이름으로 작성해주세요");
        else alert("ID와 Color 모두 작성해주세요!");
    }

    return (
        <div>
            <AddCategory>
                <label>IMG선택 <input type="file" accept="image/*" onChange={myImg} /></label>
                <Label>카테고리 입력 <input height="20px" type="text" maxLength="10" onChange={myName} /></Label>
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
`;

const Label = styled.label`
    margin-right: 20px;
`

const Div = styled.div`
    margin: 40px;
    width: 600px;
    height: 150px;
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
`;