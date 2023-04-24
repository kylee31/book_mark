import styled from "styled-components";

function WrongPage() {
    return (
        <Div>
            잘못된 접근입니다😓
        </Div>
    );
}

export default WrongPage;

//styled-components
const Div = styled.div`
    display:flex;
    height:400px;
    justify-content:center;
    align-items:center;
`;