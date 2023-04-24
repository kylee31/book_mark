import { collection, deleteDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../fbase";

function LinkList({ links, del, setDel }) {

    const flink = collection(db, 'link');

    async function onLinkDel(e) {
        //console.log(links[0].id);
        await deleteDoc(doc(flink, String(e)))
        await !del ? setDel(true) : setDel(false);
    }

    return (
        <>
            {links.map((c, index) => {
                return <Div key={index}>
                    <a className="link" href={c.link} target='_blank' rel="noreferrer">{c.title}</a>
                    <DelButton onClick={() => { onLinkDel(c.id) }}>❌</DelButton>
                    <LinkHr $txt={c.txt} />
                    <Comment $txt={c.txt} >{c.txt}</Comment>
                </Div>
            })}
        </>
    );
}

export default LinkList;

//styled-components
const Div = styled.div`
    background-color: #fff;
    border-radius: 5px;
    margin-bottom:7px; 
`;

const Comment = styled.span`
    display: ${props => props.$txt === "" ? "none" : "display"};
    margin-left: 5px;
    padding: 0 5px;
    color: grey;
`;

const DelButton = styled.span`
    cursor: pointer;
    float:right;
`;

const LinkHr = styled.hr`
    display: ${props => props.$txt === "" ? "none" : "display"};
    background-color: #fff;
    border-top: 2px dotted #8c8b8b;
`