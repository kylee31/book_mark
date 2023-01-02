import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

export default function BookMark() {

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    const [img, setImg] = useState("https://ifh.cc/g/RxT0yX.png");
    const [color, setColor] = useState("");
    const [data, setData] = useState([]);

    function information() {
        setText("");
        setTitle("");
        setLink("");
        axios.post(`http://localhost:3001/comments/`, {
            name: name,
            title: title,
            link: link,
            txt: text,
        })
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
        axios.get(`http://localhost:3001/users/`)
            .then(res => {
                return res.data
            })
            .then(
                data => {
                    if (data.length !== 0) {
                        const sortData = data.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
                        setData(sortData);
                        setName(data[0].name);
                        setImg(data[0].img);
                        setColor(data[0].color);
                    }
                }
            )
    }, []);

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
                        {data.map((item, index) => {
                            return (<option key={item.id} name="cate" value={item.name}>{item.name}</option>)
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