import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../fbase";

function Button() {

    const navigate = useNavigate();

    function createCate() {
        navigate(`/createcate`);
    }

    function logout() {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            authService.signOut()
            sessionStorage.removeItem('token')
            navigate(`/`)
        }
        else {
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <AddBlogButton onClick={createCate}>카테고리 생성</AddBlogButton>
            <AddBlogButton onClick={logout}>로그아웃</AddBlogButton>
        </div>

    )
}

export default Button;

const AddBlogButton = styled.button`
    background-color:blue;
    color:white;
    &+&{
        margin-left:20px;
    }
`;