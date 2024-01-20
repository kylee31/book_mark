import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getDocs, collection, setDoc, doc } from 'firebase/firestore'
import { db } from '../fbase';
import { useSelector } from "react-redux";

function CreateLink() {

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    const [img, setImg] = useState("https://ifh.cc/g/PDPkX5.png");
    const [color, setColor] = useState("");

    const { userUid } = useSelector(state => state.uid)
    const { cateData } = useSelector(state => state.cate);

    const flink = collection(db, 'link');
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
        for (let i = 0; i < cateData.length; i++) {
            if (cateData[i].name === name) {
                setImg(cateData[i].img);
            }
        }
    }
    function onSetColor() {
        for (let i = 0; i < cateData.length; i++) {
            if (cateData[i].name === name) {
                setColor(cateData[i].color);
            }
        }
    }

    //cate 데이터 읽기
    useEffect(() => {
        if (cateData.length > 0) {
            setName(cateData[0].name);
            setImg(cateData[0].img);
            setColor(cateData[0].color);
        }
    }, [cateData]);

    useEffect(() => {
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
                {cateData.length === 0 ? undefined :
                    <Select onChange={onSetCate}>
                        {cateData.map((item) => {
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
    display: flex;
    align-items:center;
    text-align: center;
    background-color: rgb(224, 240, 255);
    border-radius: 20px;
    box-shadow: 5px 5px 5px rgba(133, 133, 133, 0.3);
    margin-bottom: 40px;
    pointer-events:${props => props.$data === "" ? "none" : "default"};
    @media screen and (max-width:600px){
        width:500px;
    }
`;

const Div = styled.div`
    width:200px;
    @media screen and (max-width:600px){
        width:150px;
    }
`;

const Show = styled.div`
    width: 650px;
    height:180px;
    padding-top:20px;
    background-color: ${props => props.$color};
    @media screen and (max-width:600px){
        width:300px;
    }
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
    @media screen and (max-width:600px){
        width:240px;
        height:40px;
        &+&{
            margin-left:0px;
        }
    }
`;