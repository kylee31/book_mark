import React, { useState } from "react";
import InfoList from "./InfoList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Info from "./Info";

const Button = styled.p`
display:flex;
justify-content: center;
align-items: center;
margin-bottom:20px;
`;

function AddBlog() {

    const history = useNavigate();

    const [name, setName] = useState("💬");
    const [color, setColor] = useState("");
    const [img, setImg] = useState("https://ifh.cc/g/Z2nHMb.jpg");

    function myName(e) {
        //console.log(e.target.value);
        setName(e.target.value);
        if (e.target.value === "") setName("💬");
    }

    function myColor(e) {
        console.log((e.target.value));
        setColor((e.target.value).replace("#", ""));
    }

    function myImg(e) {
        //console.log(e.target.value);
        //setImg(e.target.value);
        let reader = new FileReader()

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onloadend = () => {
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
                    img,
                }),
            })
                .then(res => {
                    if (res.ok) {
                        alert("생성 완료! 블로그를 확인해보세요");
                        history(`/blog/${name}`, { state: { myname: name } });
                    }
                });
            //blog.push(info);
        }
        else {
            alert("ID와 Color 모두 작성해주세요!");
        }
    }

    return (
        <>
            <div style={{ borderRadius: "10px", backgroundColor: "lightgrey", padding: "20px", margin: "60px auto", width: "880px" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "900" }}>
                    <form encType='multipart/form-data'><label>IMG선택 <input type="file" accept="image/*" onChange={myImg} /></label></form>
                    <label style={{ marginRight: "20px" }}>ID입력 <input style={{ height: "20px" }} type="text" maxLength="5" onChange={myName} /></label>
                    <label>COLOR선택 <input type="color" onChange={myColor} /></label>
                </div>
            </div>
            <InfoList myname={name} color={color} img={img} toggle={false} />
            <div className="blog" style={{ backgroundColor: `#${color}` }}>
                <div>
                    <Info myname={name} img={img} /><br />
                    {name}님에게 남긴 댓글을 확인해보세요
                </div>
                <div style={{ margin: "40px", width:"600px",height:"150px"}}>
                    <div style={{ backgroundColor: "#fff", fontWeight: "900", borderRadius: "5px", marginBottom: "5px" }}>
                        <span style={{ padding: "0 5px" }}>예시입니다(생성될 블로그 미리보기).</span>
                        <span style={{ borderLeft: "2px solid grey", padding: "0 5px", color: "grey" }}>2022. 8. 21. 오후 12:03:10</span>
                    </div>
                </div>
                <button style={{ marginBottom: "20px", height: "20px" }}>돌아가기</button>
            </div>
            <Button><button onClick={addInfo}>저장하기</button></Button>
        </>
    );
}

export default AddBlog;