import React, { useState} from "react";
import Info from "./Info";
import { useNavigate, useLocation } from "react-router";

export default function MyBlog() {
    const location = useLocation();
    const myname = location.state.myname;

    const history = useNavigate();

    const [showInfo, setShowInfo] = useState(JSON.parse(localStorage.getItem("data")));
    function Comments() {
        setShowInfo(JSON.parse(localStorage.getItem("data")));
    }

    let count=0;

    function empty(){
        showInfo.map((e)=>{
            if(e.name===myname)count++;
        })
        return count;
    }

    /*
    const [info,setInfo]=useState(localStorage.getItem("data")!==null?JSON.parse(localStorage.getItem("data")):[]);

    function information(){
        if(mycomment.txt!=="") setInfo(info=>([...info,mycomment]));
        /*localStorage.setItem("data",JSON.stringify(info));
        console.log(day.concat(time));
    };
    
    useEffect(()=>{
        //console.log(info);
        localStorage.setItem("data",JSON.stringify(info));
    },[info]);
    */

    function firstLocation() {
        history("/");
    };
    return (
        <div onLoad={Comments} className="blog">
            <div>
                <Info myname={myname} /><br />
                {myname}님에게 남긴 댓글을 확인해보세요
            </div>
            <div style={{ margin: "40px" }}>
                {/*{text} {text?time:"💬"} */}
                {empty() !== 0 ?
                    <div className="showcomment">
                        {
                            showInfo.map((c, index) => {
                                if (c.name === myname) {
                                    return <div key={index} style={{ backgroundColor: "#fff", fontWeight: "900", borderRadius: "5px", marginBottom: "5px" }}>
                                        <span style={{ padding: "0 5px" }}>{c.txt}</span>
                                        <span style={{ borderLeft: "2px solid grey", padding: "0 5px", color: "grey" }}>{c.time}</span>
                                    </div>
                                }
                            }
                            )
                        }
                    </div> : <div style={{width:"600px",padding:"65px 0"}}>💬</div>}
            </div>
            <button onClick={firstLocation} style={{marginBottom: "20px",height:"20px"}}>돌아가기</button>
        </div>
    );
}