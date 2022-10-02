import React, { useState, useLayoutEffect } from "react";
import Profile from "../component/Profile";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import BookMarkList from "../component/BookMarkList";

const MyBookMark = styled.div`
    width:600px;
    min-height:150px;
    margin: 20px;
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
    background-color:${props => props.$color}
`;

const Button = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:40px;
`;

export default function MyBlog() {
    const location = useLocation();
    const myname = location.state.myname;
    const myimg = location.state.myimg;
    const mycolor = location.state.mycolor;

    const [cmt, setComments] = useState([]);
    const [del, setDel] = useState(false);
    const [id, setId] = useState("");

    useLayoutEffect(() => {
        fetch("https://book-marking.herokuapp.com/users")
            .then(res => {
                return res.json()
            })
            .then(e => {
                const blog = e.filter(data => data.name === myname);
                setId(blog[0].id);
            })
    }, []);

    useLayoutEffect(() => {
        fetch(`https://book-marking.herokuapp.com/comments`)
            .then(res => {
                return res.json()
            })
            .then(e => {
                const myComments = e.filter(data => data.name === myname);
                setComments(myComments);
            })
    }, [del])

    function onDelete() {
        if (window.confirm("카테고리를 삭제하시겠습니까?")) {
            fetch(`https://book-marking.herokuapp.com/users/${id}`, {
                method: "DELETE"
            })
                .then((res => {
                    if (res.ok) {
                        history(`/`);
                    }
                }))
                .catch(e => console.log(e))
        }
    }

    function bookMark() {
        return (<>
            <BookMarkList cmt={cmt} myname={myname} del={del} setDel={setDel} />
        </>);
    }

    const history = useNavigate();
    function onLocation() {
        history("/");
    };

    return (
        <Blog $color={`#${mycolor}`}>
            <Profile myname={myname} img={myimg} /><br />
            <MyBookMark>
                {bookMark()}
            </MyBookMark>
            <Button>
                <button onClick={onLocation} style={{ height: "20px", marginRight: "20px" }}>돌아가기</button>
                <button onClick={() => { onDelete(); }} style={{ height: "20px" }}>카테고리 삭제</button>
            </Button>
        </Blog>
    );
}