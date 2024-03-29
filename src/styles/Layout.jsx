import styled from 'styled-components';
import Header from '../component/Header';

function Layout({ children }) {
    return (
        <Div>
            <Header />
            <div>
                {children}
            </div>
        </Div>
    );
}

export default Layout;

const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-width:600px;
`