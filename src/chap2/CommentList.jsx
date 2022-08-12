import React from "react";
import Comment from "./Comment";

function CommentList(props){
    return (
        <div>
            <Comment name={"ddd"} comment={"안녕하세요ㅎㅎ"}/>
            <Comment name={"우영우"} comment={"오"}/>
        </div>
    );
}

export default CommentList;