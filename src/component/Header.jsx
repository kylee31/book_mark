import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isLogin } from "../util/isLogin";
import { useAuthState } from "react-firebase-hooks/auth";
import { authService } from './../fbase.js'

function Header() {
    const navigate = useNavigate();
    const loc = useLocation();

    const auth = authService;

    //useAuthState로 auth 로딩여부 알기
    //authName(value)는 getAuth().currentUser, loading은 로딩여부(boolean)
    const [authName, loading] = useAuthState(auth);

    function main() {
        if (isLogin() && loc.pathname !== '/') {
            navigate(`/main`);
            console.log()
        }
    }

    return (
        <Div>
            <Title><span onClick={main}>{(!loading && loc.pathname !== '/') ? (authName.displayName) + "'S " : ""}BOOK-MARK</span></Title>
        </Div>
    );
}

export default Header;

//styled-components
const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:100px;
`;

const Title = styled.span`
    font-size:2rem;
    cursor:pointer;
`;

