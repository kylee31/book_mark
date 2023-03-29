import { collection, deleteDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../fbase";

export default function LinkList({ links, del, setDel }) {

    const flink = collection(db, 'link');

    async function onLinkDel(e) {
        //console.log(links[0].id);
        await deleteDoc(doc(flink, e))
        await !del ? setDel(true) : setDel(false);
    }

    return (
        <>
            {links.map((c, index) => {
                return <Div key={index}>
                    <a className="link" href={c.link} target='_blank' rel="noreferrer">{c.title}</a>
                    <DelButton onClick={() => { onLinkDel(c.id) }}>❌</DelButton>
                    <hr style={{ display: c.txt === "" ? "none" : "display", backgroundColor: "#fff", borderTop: "2px dotted #8c8b8b" }} />
                    <Comment style={{ display: c.txt === "" ? "none" : "display" }}>{c.txt}</Comment>
                </Div>
            })}
        </>
    );
}

//styled-components
const Div = styled.div`
    background-color: #fff;
    border-radius: 5px;
    margin-bottom:7px; 
`;

const Comment = styled.span`
    margin-left: 5px;
    padding: 0 5px;
    color: grey;
`;

const DelButton = styled.span`
    cursor: pointer;
    float:right;
`;