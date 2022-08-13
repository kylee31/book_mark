import React, { useState } from "react";
import InfoList from "./InfoList";
import styled from "styled-components";
import blog from "../db/blog.json";
import { useNavigate } from "react-router-dom";

const Button = styled.p`
display:flex;
justify-content: center;
align-items: center;
`;

function AddBlog() {

    const history=useNavigate();

    const [name,setName]=useState("💬");
    const [color,setColor]=useState("");

    const info={
        name:name,
        color:color
    };

    function myName(e){
        //console.log(e.target.value);
        setName(e.target.value);
        if(e.target.value==="") setName("💬");
    }

    function myColor(e){
        //console.log((e.target.value).replace("#",""));
        setColor((e.target.value).replace("#",""));
    }

    function addInfo(){
        if(name!=="💬"&&color!=="") {
            blog.push(info);
            history("/");
        }
        else{
            alert("ID와 Color 모두 작성해주세요!");
        }
    }

    return (
        <>
        <div style={{borderRadius:"10px",backgroundColor:"lightgrey",padding:"20px",margin:"60px auto", width:"880px"}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"900"}}>
                <label style={{marginRight:"20px"}}>ID입력 <input style={{height:"20px"}} type="text" maxLength="5" onChange={myName}/></label>
                <label>COLOR선택 <input type="color" onChange={myColor}/></label>
            </div>
        </div>
            <InfoList myname={name} color={color} toggle={false}/>
            <Button><button onClick={addInfo}>저장하기</button></Button>
        </>
    );
}

export default AddBlog;