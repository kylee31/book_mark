import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import star from "../db/star.png";

const Box = styled.div`
    margin:auto;
    display: flex;
    align-items:center;
    text-align: center;
    width: 900px;
    background-color: rgb(224, 240, 255);
    border-radius: 20px;
    box-shadow: 5px 5px 5px rgba(133, 133, 133, 0.3);
    margin-bottom: 50px;
    padding-left:20px;
    font-weight:900;
    pointer-events:${props => props.$data === "" ? "none" : "default"};
`;


const Comments = styled.textarea`
    width:240px;
    height:40px;
    margin-top:0px;
    border:0;
    resize:none;
    margin-bottom:0px;
    font-family:Arial;
    &+&{
        margin-left:20px;
    }
`;

export default function Comment() {

    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    const [img, setImg] = useState(star);
    const [color, setColor] = useState("");

    function information() {
        setText("");
        setTitle("");
        setLink("");
        fetch(`http://localhost:3001/comments/`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: name,
                title: title,
                link: link,
                txt: text,
            }),
        })
            .then(res => {
                if (res.ok) {
                    console.log("setting ok");
                }
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
    const onSetImg = () => {
        data.map((item) => {
            if (item.name === name) {
                setImg(item.img);
            }
        });
    }
    const onSetColor = () => {
        data.map((item) => {
            if (item.name === name) {
                setColor(item.color);
            }
        });
    }

    useEffect(() => {
        fetch(`http://localhost:3001/users`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.length !== 0) {
                    setData(data);
                    setName(data[0].name);
                    setImg(data[0].img);
                    setColor(data[0].color);
                }
            });
    }, [name]);

    useEffect(() => {
        setName(name);
        onSetImg();
        onSetColor();
    }, [name]);

    return (
        <Box $data={name}>
            <div style={{ width: "200px" }}>
                <img src={img} alt="" /><br />
                {name === "" ? undefined :
                    <select className="cate" onChange={onSetCate} style={{ textAlign: "center" }}>
                        {data.map((item, index) => {
                            return (<option key={item.id} name="cate" value={item.name}>{item.name}</option>)
                        })}
                    </select>
                }
                <br /><span>북마크</span>
            </div>
            <div className="show" style={{ backgroundColor: `#${color}` }}>
                <div>
                    <Comments placeholder="title" value={title} onChange={onSetTitle} />
                    <Comments placeholder="link" value={link} onChange={onSetLink} />
                </div>
                <Comments style={{ width: "500px", height: "80px" }} placeholder="content" value={text} onChange={onSetText} /><br />
                <button type="submit" onClick={title !== "" && link !== "" ? information : () => { alert("제목과 링크 모두 입력해주세요") }}>저장</button>
            </div>
        </Box>
    );
}