import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
    margin:20px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    border-radius:1.3rem;
    width:170px;
    height:170px;
    cursor:pointer;
    background-color:${props => props.$color};
`;

export default function BookMarkItem({ img, name, color }) {

    const history = useNavigate();
    function onBookMark() {
        history(`/blog/${name}`, { state: { myname: name } });
    }

    return (
        <Box $color={`#${color}`} onClick={onBookMark}>
            <img src={img} alt="" />
            <span>{name}</span>
        </ Box >
    );
};