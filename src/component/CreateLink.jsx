import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getDocs, collection, query, where, setDoc, doc } from 'firebase/firestore'
import { authService, db } from '../fbase';

function CreateLink() {

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    const [img, setImg] = useState("https://ifh.cc/g/RxT0yX.png");
    const [color, setColor] = useState("");
    const [data, setData] = useState([]);

    const [userUid, setUserUid] = useState("");
    const cate = collection(db, 'cate');
    const flink = collection(db, 'link');
    const arr = [];
    const [newId, setId] = useState(0);

    async function information() {
        setText("");
        setTitle("");
        setLink("");
        //link data 저장
        await setDoc(doc(flink, String(newId)), {
            name: name,
            title: title,
            link: link,
            txt: text,
            uid: userUid,
            id: newId
        });
    };

    function onSetText(e) {
        setText(e.target.value);
    }
    function onSetTitle(e) {
        setTitle(e.target.value);
    }
    function onSetLink(e) {
        setLink(e.target.value);
    }
    function onSetCate(e) {
        setName(e.target.value);
    }
    function onSetImg() {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === name) {
                setImg(data[i].img);
            }
        }
    }
    function onSetColor() {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === name) {
                setColor(data[i].color);
            }
        }
    }

    useLayoutEffect(() => {
        //cate 데이터 읽기
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

            if (arr.length > 0) {
                const sortData = arr.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
                setData(sortData);
                setName(arr[0].name);
                setImg(arr[0].img);
                setColor(arr[0].color);
            }
        }
        getInfo();
    }, [userUid]);

    useLayoutEffect(() => {
        async function getLink() {
            const links = await getDocs(flink);
            await links.forEach((doc) => {
                setId(Number(doc.id) + 1);
            });
        }
        getLink();
    }, [information])

    useEffect(() => {
        setName(name);
        onSetImg();
        onSetColor();
    }, [name]);

    return (
        <Box $data={name}>
            <Div>
                <img src={img} alt="" /><br />
                {name === "" ? undefined :
                    <Select onChange={onSetCate}>
                        {data.map((item) => {
                            return (<option key={item.name} name="cate" value={item.name}>{item.name}</option>)
                        })}
                    </Select>
                }<br />
                <span>북마크</span>
            </Div>
            <Show $color={`#${color}`}>
                <div>
                    <Bookmarks $width="240px" $height="40px" placeholder="title" value={title} onChange={onSetTitle} />
                    <Bookmarks $width="240px" $height="40px" placeholder="link" value={link} onChange={onSetLink} />
                </div>
                <Bookmarks $width="500px" $height="70px" placeholder="content" value={text} onChange={onSetText} /><br />
                <button type="submit" onClick={title !== "" && link !== "" ? information : () => { alert("제목과 링크 모두 입력해주세요") }}>저장</button>
            </Show>
        </Box>
    );
}

export default CreateLink;

//styled-components
const Box = styled.div`
    margin:auto;
    display: flex;
    align-items:center;
    text-align: center;
    width: 900px;
    background-color: rgb(224, 240, 255);
    border-radius: 20px;
    box-shadow: 5px 5px 5px rgba(133, 133, 133, 0.3);
    margin-bottom: 40px;
    padding-left:20px;
    pointer-events:${props => props.$data === "" ? "none" : "default"};
`;

const Div = styled.div`
    width:200px;
`;

const Show = styled.div`
    width: 650px;
    height:180px;
    padding-top:20px;
    background-color: ${props => props.$color};
`;

const Select = styled.select`
    text-align: center;
`;

const Bookmarks = styled.textarea`
    width:${props => props.$width};
    height:${props => props.$height};
    margin-top:0px;
    border:0;
    resize:none;
    margin-bottom:0px;
    font-family:Arial;
    &+&{
        margin-left:20px;
    }
`;