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
    font-family:Arial;
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

    //1동작 완료후
    function information() {
        (info == null) ? setInfo([comment]) : setInfo([...info, comment]);
        setText("");
        setTimeout(() => {
            history(`/blog/${myname}`,{state:{myname:myname}});
        }, 200);
    };

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(info));
    }, [info]);

    //2이렇게 동작시키고 싶다. 어떻게 해야하나.
    //setTimeout 사용해서 렌더링 후(useEffect 동작함) history 이동

    function inputText(e) {
        setText(e.target.value);
    }
    //그니까 전송을 누르면 이게 바로 저장이 안된다.. 왜..? state 비동기 특성때문
    //useEffect 사용하여 해결
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