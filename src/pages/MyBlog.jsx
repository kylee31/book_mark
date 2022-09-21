import React, { useState, useEffect } from "react";
import Profile from "../component/Profile";
import { useNavigate, useLocation } from "react-router";

function MyBlog() {
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
                .then(res => console.log("ok"))

            delId.map(e =>
                fetch(`http://localhost:3001/comments/${e}`, {
                    method: "DELETE"
                })
                    .then(res => console.log("ok"))
            )
            history("/")
        }
    }

    useEffect(() => {
        getComment();
    }, [del])

    const history = useNavigate();

    function onLocation() {
        history("/");
    };

    return (
        <div className="blog" onLoad={getData} style={{ backgroundColor: `#${color}` }}>
            <div>
                <Profile myname={myname} img={img} /><br />
            </div>
            <div style={{ margin: "40px" }}>
                <div className="showcomment">
                    {
                        cmt.map((c, index) => {
                            if (c.name === myname) {
                                return <div key={index} style={{ backgroundColor: "#fff", fontWeight: "900", borderRadius: "5px", marginBottom: "5px" }}>
                                    <span style={{ padding: "0 5px" }}>
                                        <a className="link" href={c.link} target='_blank' rel="noreferrer">{c.title}</a>
                                    </span>
                                    <span style={{ borderLeft: "2px solid grey", padding: "0 5px", color: "grey" }}>{c.txt}</span>
                                    <span style={{ cursor: "pointer" }} onClick={() => {
                                        fetch(`http://localhost:3001/comments/${c.id}`, {
                                            method: "DELETE",
                                        })
                                            .then(res => {
                                                if (res.ok) {
                                                    !del ? setDel(true) : setDel(false);
                                                }
                                            });
                                    }}>❌</span>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
            <button onClick={onLocation} style={{ marginBottom: "20px", height: "20px" }}>돌아가기</button>
            <button onClick={onDelete} style={{ marginBottom: "80px", height: "20px", position: "absolute" }}>삭제</button>
        </div>
    );
}

export default MyBlog;