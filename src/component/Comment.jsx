import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Comments = styled.textarea`
    width:250px;
    height:40px;
    margin-top:20px;
    border:0;
    resize:none;
    margin-bottom:20px;
`;

const Box=styled.div`
    width:250px;
    height:40px;
    margin:20px auto;
    background-color:white;
`;

export default function Comment({ myname, color, toggle }) {

    const history = useNavigate();
    const [text, setText] = useState("");
    const day = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const comment = {
        name: myname,
        txt: text,
        time: day.concat(" ", time),
    };

    const [info, setInfo] = useState(JSON.parse(localStorage.getItem("data")) == null ? [] : JSON.parse(localStorage.getItem("data")));

    function information() {
        (info == null) ? setInfo([comment]) : setInfo([...info, comment]);
        setText("");
        //history("/blog",{state:{name:myname}});
    };

    useEffect(() => {
        //console.log(info);
        localStorage.setItem("data", JSON.stringify(info));
    }, [info]);

    function inputText(e) {
        setText(e.target.value);
    }
    //그니까 전송을 누르면 이게 바로 저장이 안된다.. 왜..? state 비동기 특성때문
    return (
        <>
            <div className="show" style={{ backgroundColor: `#${color}` }}>
                {myname}에게 댓글을 남겨주세요!
                {toggle?<Comments value={text} onChange={inputText} />:<Box/>}
                <button type="submit" onClick={toggle?(text !== "" ? information : () => {alert("내용을 입력해주세요")}):undefined}>전송</button>
            </div>
        </>
    );
}