import React, { useState, useLayoutEffect } from "react";
import Profile from "../component/Profile";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

const MyBookMark = styled.div`
    width:600px;
    min-height:150px;
    margin: 40px;
`;

const Div = styled.div`
    display:flex;
    flex-direction:row;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom:5px; 
`;

const Comment = styled.span`
    margin-left: 5px;
    border-left: 2px solid grey;
    padding: 0 5px;
    color: grey;
`;

const DelButton = styled.span`
    cursor: pointer;
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
    const [delId, setDelId] = useState([]);

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
                const delIds = myComments.map(data => { return data.id });
                setComments(myComments);
                setDelId(delIds);
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

    /*
    function onDelList() {
        if (window.confirm("모든 북마크를 삭제하시겠습니까?")) {
            delId.map(item => (
                fetch(`http://localhost:3001/comments/${item}`, {
                    method: "DELETE"
                })
                    .catch(e => console.log(e))
            ));
            !del ? setDel(true) : setDel(false);
        }
    }
    */

    const history = useNavigate();
    function onLocation() {
        history("/");
    };

    return (
        <Blog $color={`#${mycolor}`}>
            <Profile myname={myname} img={myimg} /><br />
            <MyBookMark>
                {cmt.map((c, index) => {
                    if (c.name === myname) {
                        return <Div key={index}>
                            <div><a className="link" href={c.link} target='_blank' rel="noreferrer">{c.title}</a></div>
                            <div>
                                <Comment>{c.txt}</Comment>
                                <DelButton onClick={() => {
                                    fetch(`https://book-marking.herokuapp.com/comments/${c.id}`, {
                                        method: "DELETE",
                                    })
                                        .then(res => {
                                            if (res.ok) {
                                                !del ? setDel(true) : setDel(false);
                                            }
                                        });
                                }}>❌</DelButton>
                            </div>
                        </Div>
                    }
                })}
            </MyBookMark>
            <Button>
                <button onClick={onLocation} style={{ height: "20px", marginRight: "20px" }}>돌아가기</button>
                <button onClick={() => { onDelete(); }} style={{ height: "20px" }}>카테고리 삭제</button>
                {/*<button onClick={() => { onDelList(); }} style={{ height: "20px" }}>모든 링크 삭제</button>*/}
            </Button>
        </Blog>
    );
}