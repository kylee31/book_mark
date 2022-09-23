import React, { useState, useEffect } from "react";
import Profile from "../component/Profile";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

const MyCate = styled.div`
    background-color:${props => props.$color}
`;

const MyBookMark = styled.div`
    width:600px;
    min-height:150px;
    margin: 40px;
`;

const Div = styled.div`
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

export default function MyBlog() {
    const location = useLocation();
    const myname = location.state.myname;

    const [img, setImg] = useState("https://ifh.cc/g/Z2nHMb.jpg");
    const [color, setColor] = useState("#E0F0FF");
    const [cmt, setComments] = useState([]);
    const [del, setDel] = useState(false);
    const [id, setId] = useState("");
    const [delId, setDelId] = useState([]);

    function getData() {
        fetch("http://localhost:3001/users")
            .then(res => {
                return res.json()
            })
            .then(e => {
                const blog = e.filter(data => data.name === myname);
                setImg(blog[0].img);
                setColor(blog[0].color);
                setId(blog[0].id);
            })
    }

    function getComment() {
        fetch(`http://localhost:3001/comments`)
            .then(res => {
                return res.json()
            })
            .then(e => {
                const myComments = e.filter(data => data.name === myname);
                const delIds = myComments.map(data => { return data.id });
                setComments(myComments);
                setDelId(delIds);
            })
    }

    function onDelete() {
        if (window.confirm("삭제하시겠습니까? 해당 카테고리의 모든 북마크가 삭제됩니다.")) {
            fetch(`http://localhost:3001/users/${id}`, {
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

    function onDelList() {
        delId.map(item => (
            fetch(`http://localhost:3001/comments/${item}`, {
                method: "DELETE"
            })
                .catch(e => console.log(e))
        ));
    }

    useEffect(() => {
        getComment();
    }, [del])

    const history = useNavigate();
    function onLocation() {
        history("/");
    };

    return (
        <MyCate className="blog" onLoad={getData} $color={`#${color}`}>
            <Profile myname={myname} img={img} /><br />
            <MyBookMark>
                {cmt.map((c, index) => {
                    if (c.name === myname) {
                        return <Div key={index}>
                            <a className="link" href={c.link} target='_blank' rel="noreferrer">{c.title}</a>
                            <Comment>{c.txt}</Comment>
                            <DelButton onClick={() => {
                                fetch(`http://localhost:3001/comments/${c.id}`, {
                                    method: "DELETE",
                                })
                                    .then(res => {
                                        if (res.ok) {
                                            !del ? setDel(true) : setDel(false);
                                        }
                                    });
                            }}>❌</DelButton>
                        </Div>
                    }
                })}
            </MyBookMark>
            <button onClick={onLocation} style={{ marginBottom: "20px", height: "20px" }}>돌아가기</button>
            <button onClick={() => { onDelete(); onDelList(); }} style={{ marginBottom: "80px", height: "20px", position: "absolute" }}>삭제</button>
        </MyCate>
    );
}