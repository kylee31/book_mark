import { useNavigate } from "react-router-dom";
import { useState} from "react";
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

const Box = styled.div`
    width:250px;
    height:40px;
    margin:20px auto;
    background-color:white;
`;

export default function Comment({ myname, color, toggle }) {

    //const history = useNavigate();
    const [text, setText] = useState("");
    const day = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    //1동작 완료후
    function information() {
        setText("");
        //history(`/blog/${myname}`, { state: { myname: myname } });
        
        fetch(`http://localhost:3001/comments/`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: myname,
                txt: text,
                time: day.concat(" ", time),
            }),
        })
        .then(res => {
            if (res.ok) {
                console.log("setting ok");
            }
        });
    };

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
                {toggle ? <Comments value={text} onChange={inputText} /> : <Box />}
                <button type="submit" onClick={toggle ? (text !== "" ? information : () => { alert("내용을 입력해주세요") }) : undefined}>전송</button>
            </div>
        </>
    );
}