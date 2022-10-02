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
    box-shadow: 5px 5px 0px rgba(133, 133, 133, 0.3);
`;

export default function CategoryItem({ img, name, color }) {

    const history = useNavigate();
    function onBookMark() {
        history(`/blog/${name}`, { state: { myname: name, myimg: img, mycolor: color } });
    }

    return (
        <Box $color={`#${color}`} onClick={onBookMark}>
            <img src={img} alt="" />
            <span>{name}</span>
        </ Box >
    );
};