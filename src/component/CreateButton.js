import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
margin:auto;
background-color: #76c3ea;
border: 0;
box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
width: 100px;
`;

export default function CreaetButton({ myname, toggle }) {

    const history = useNavigate();
    function main() {
        history(`/createblog`);
    }

    return (
        <Button onClick={toggle ? main : undefined}>다른 카테고리 생성하기</Button>
    );
}