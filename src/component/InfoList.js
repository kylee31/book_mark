import PersonalBlog from "./PersonalBlog";
import Info from "./Info";


export default function InfoList({ myname, color }) {
    return (
        <div className="box" style={{paddingLeft:"20px"}}>
            <div style={{width:"300px"}}><Info myname={myname} /></div>
            <PersonalBlog myname={myname} color={color} />
        </div>
    );
}