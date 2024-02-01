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
            authService.signOut();
            navigate(`/`);
        }
        else {
        }
    }

    return (
        <>
            <Btn>
                <AddBlogButton onClick={createCate}>카테고리 생성</AddBlogButton>
                <AddBlogButton onClick={logout}>로그아웃</AddBlogButton>
            </Btn>
        </>
    )
}

export default Button;

const Btn = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    margin-bottom: 20px;
`

const AddBlogButton = styled.button`
    background-color:#1166FF;
    color:white;
    &+&{
        margin-left:20px;
    }
`;