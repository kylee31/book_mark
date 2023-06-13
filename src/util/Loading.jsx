import styled from "styled-components";
import { BeatLoader } from "react-spinners";

function Loading({ isLoading }) {

    return (
        isLoading &&
        <Div>
            <BeatLoader color="gray" loading={isLoading} size={15} />
        </Div>
    );
}

export default Loading;

const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0 auto;
`