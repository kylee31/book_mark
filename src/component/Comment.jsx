//import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Comments = styled.textarea`
    width:250px;
    height:40px;
    margin-top:20px;
    border:0;
    resize:none;
`;

export default function Comment({ myname, color }) {

    //const history = useNavigate();
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
                <Comments value={text} onChange={inputText} />
                <button type="submit" onClick={text !== "" ? information : () => { alert("내용을 입력해주세요")}}>전송</button>
            </div>
        </>
    );
}