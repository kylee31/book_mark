import styled from "styled-components";
import Profile from "./Profile";
import Comment from "./Comment";
import BlogButton from "./BlogButton";

const Box=styled.div`
    margin:auto;
    display: flex;
    text-align: center;
    width: 900px;
    height: 200px;
    background-color: rgb(224, 240, 255);
    border-radius: 20px;
    box-shadow: 5px 5px 5px rgba(133, 133, 133, 0.3);
    margin-top: 50px;
    margin-bottom: 50px;
    padding-left:20px;
`;

export default function BlogInfo({ myname, color, img, toggle }) {
    return (
        <Box>
            <div style={{width:"300px"}}>
                <Profile myname={myname} img={img}/>
            </div>
            <Comment myname={myname} color={color} toggle={toggle}/>
            <BlogButton myname={myname} color={color} toggle={toggle} />
        </Box>
    );
}