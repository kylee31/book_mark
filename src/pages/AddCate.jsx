import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "../component/Profile";
import axios from "axios";

export default function AddCate() {

    const history = useNavigate();

    const [name, setName] = useState("๐ฌ");
    const [color, setColor] = useState("");
    const [img, setImg] = useState("https://ifh.cc/g/RxT0yX.png");
    const [nameList, setNameList] = useState([]);
    const [same, setSame] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/users`)
            .then(res => {
                return res.data
            })
            .then(e => {
                setNameList(e.map((e) => {
                    return e.name;
                }))
            })
    }, []);

    //๋งํฌ๋ฅผ ๋์ผํ ์ด๋ฆ์ผ๋ก ์ฐพ๊ธฐ ๋๋ฌธ์ ๋์ผํ ์นดํ๊ณ ๋ฆฌ ์์ฑ๋ถ๊ฐ
    useEffect(() => {
        for (let i = 0; i < nameList.length; i++) {
            (nameList[i] === name) ? setSame(true) : setSame(false);
        }
    }, [same, myName]);

    function myName(e) {
        setName(e.target.value);
        if (e.target.value === "") setName("๐ฌ");
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

    function addInfo() {
        if (name !== "๐ฌ" && color !== "" && same === false) {
            axios.post(`http://localhost:3001/users`, {
                name,
                color,
                img
            })
                .then(res => {
                    alert("์์ฑ ์๋ฃ! ์๋ก์ด ์นดํ๊ณ ๋ฆฌ์ ๋ถ๋งํฌ ์ ์ฅํ์ธ์");
                    history(`/`);
                });
        }
        else if (same === true) alert("๋์ผํ ์ด๋ฆ์ด ์กด์ฌํฉ๋๋ค! ๋ค๋ฅธ ์ด๋ฆ์ผ๋ก ์์ฑํด์ฃผ์ธ์");
        else if ((name === "๐ฌ" && same === false) || (color === "" && same === false)) alert("ID์ Color ๋ชจ๋ ์์ฑํด์ฃผ์ธ์!");
    }

    return (
        <div>
            <AddCategory>
                <label>IMG์ ํ <input type="file" accept="image/*" onChange={myImg} /></label>
                <label style={{ marginRight: "20px" }}>์นดํ๊ณ ๋ฆฌ ์๋ ฅ <input style={{ height: "20px" }} type="text" maxLength="10" onChange={myName} /></label>
                <label>COLOR์ ํ <input type="color" onChange={myColor} /></label>
            </AddCategory>
            <Blog $color={`#${color}`}>
                <Profile myname={name} img={img} /><br />
                <Div>
                    <Bookmark>
                        <span style={{ padding: "0 5px" }}>์์(์์ฑ๋  ์นดํ๊ณ ๋ฆฌ ๋ฏธ๋ฆฌ๋ณด๊ธฐ)</span>
                        <span style={{ borderLeft: "2px solid grey", padding: "0 5px", color: "grey" }}>๋ถ๋งํฌ ์ค๋ช๋ โ</span>
                    </Bookmark>
                </Div>
            </Blog>
            <Button>
                <button onClick={addInfo}>์ ์ฅํ๊ธฐ</button>
            </Button>
        </div>
    );
}

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

const Div = styled.div`
    margin: 40px;
    width: 600px;
    height: 150px;
`;

const Bookmark = styled.div`
    background-color: #fff;
    border-radius:5px;
`;

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