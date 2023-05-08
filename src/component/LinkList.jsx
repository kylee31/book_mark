import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../fbase";
import CateLink from "./CateLink";

function LinkList({ links, del, setDel }) {

    const flink = collection(db, 'link');

    async function onLinkDel(e) {
        await deleteDoc(doc(flink, String(e)))
        await !del ? setDel(true) : setDel(false);
    }

    return (
        <>
            {links.map((c, index) => {
                return <CateLink key={index} link={c.link} id={c.id} title={c.title} txt={c.txt} onLinkDel={onLinkDel} />
            })}
        </>
    );
}

export default LinkList;
