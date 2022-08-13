import { useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function PersonalBlog({ myname, color, toggle }) {

    const history = useNavigate();

    function main() {
        history(`/blog`,{state:{myname:myname, text:""}});
    }

    return (
        <>
            <Comment myname={myname} color={color} toggle={toggle}/>
            <button onClick={toggle?main:undefined} style={{
                margin:"auto",
                backgroundColor:"#76c3ea",
                border:"0",
                boxShadow:"3px 3px 3px rgba(0, 0, 0, 0.3)",
                width:"150px",
            }}>{myname} 블로그 방문</button>
        </>
    );
}