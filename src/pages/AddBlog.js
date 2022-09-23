import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "../component/Profile";
import star from "../db/star.png";

const AddCate = styled.div`
    background-color: lightgrey;
    padding: 20px;
    margin: 0px auto;
    width: 860px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:10px;
`;

const Example = styled.div`
    background-color: ${props => props.$color};
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

function AddBlog() {

    const history = useNavigate();

    const [name, setName] = useState("💬");
    const [color, setColor] = useState("");
    const [img, setImg] = useState(star);

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

    function addInfo() {
        if (name !== "💬" && color !== "") {
            fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    color,
                    img
                }),
            })
                .then(res => {
                    if (res.ok) {
                        alert("생성 완료! 새로운 카테고리에 북마크 저장하세요");
                        history(`/`);
                    }
                });
        }
        else {
            alert("ID와 Color 모두 작성해주세요!");
        }
    }

    return (
        <div>
            <AddCate>
                <label>IMG선택 <input type="file" accept="image/*" onChange={myImg} /></label>
                <label style={{ marginRight: "20px" }}>카테고리 입력 <input style={{ height: "20px" }} type="text" maxLength="10" onChange={myName} /></label>
                <label>COLOR선택 <input type="color" onChange={myColor} /></label>
            </AddCate>
            <Example className="blog" $color={`#${color}`}>
                <Profile myname={name} img={img} /><br />
                <Div>
                    <Bookmark>
                        <span style={{ padding: "0 5px" }}>예시(생성될 카테고리 미리보기)</span>
                        <span style={{ borderLeft: "2px solid grey", padding: "0 5px", color: "grey" }}>❌</span>
                    </Bookmark>
                </Div>
            </Example>
            <Button>
                <button onClick={addInfo}>저장하기</button>
            </Button>
        </div>
    );
}

export default AddBlog;