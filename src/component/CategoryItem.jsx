import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getFirebaseLinkData } from "../modules/linkDuck";

function CategoryItem({ img, name, color }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setGetFirebaseLinkData = () => dispatch(getFirebaseLinkData({ myname: name }));

    async function onBookMark() {
        await setGetFirebaseLinkData();
        await navigate(`/cate/${name}`, { state: { myname: name, myimg: img, mycolor: color } });
    }

    return (
        <Box $color={`#${color}`} onClick={onBookMark}>
            <img src={img} alt="" />
            <span>{name}</span>
        </ Box >
    );
};

export default CategoryItem;

//styled-components
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