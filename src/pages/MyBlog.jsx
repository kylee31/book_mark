import React, { useState, useEffect } from "react";
import Profile from "../component/Profile";
import { useNavigate, useLocation } from "react-router";

function MyBlog() {
    const location = useLocation();
    const myname = location.state.myname;

    const [img, setImg] = useState("https://ifh.cc/g/Z2nHMb.jpg");
    const [color, setColor] = useState("#E0F0FF");
    const [cmt, setComments] = useState([]);
    const [del,setDel]=useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(res => {
                return res.json()
            })
            .then(e => {
                const blog = e.filter(data => data.name === myname);
                setImg(blog[0].img);
                setColor(blog[0].color);
            })

        fetch(`http://localhost:3001/comments`)
            .then(res => {
                return res.json()
            })
            .then(e => {
                const myComments = e.filter(data => data.name === myname);
                setComments(myComments);
            })
    }, [del])

    const history = useNavigate();

    function onLocation() {
        history("/");
    };

    return (
        <div className="blog" style={{ backgroundColor: `#${color}` }}>
            <div>
                <Profile myname={myname} img={img} /><br />
                {myname}님에게 남긴 댓글을 확인해보세요
            </div>
            <div style={{ margin: "40px" }}>
                <div className="showcomment">
                    {
                        cmt.map((c, index) => {
                            if (c.name === myname) {
                                return <div key={index} style={{ backgroundColor: "#fff", fontWeight: "900", borderRadius: "5px", marginBottom: "5px" }}>
                                    <span style={{ padding: "0 5px" }}>{c.txt}</span>
                                    <span style={{ borderLeft: "2px solid grey", padding: "0 5px", color: "grey" }}>{c.time}</span>
                                    <span onClick={()=>{
                                         fetch(`http://localhost:3001/comments/${c.id}`, {
                                            method: "DELETE",
                                        })
                                        .then(res => {
                                            if (res.ok) {
                                                !del?setDel(true):setDel(false);
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
        </div>
    );
}

export default MyBlog;