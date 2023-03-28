import Header from '../component/Header';

function Layout({ children }) {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
        </>
    );
}

export default Layout;