import PersonalBlog from "./PersonalBlog";
import Info from "./Info";

export default function InfoList({ myname, color, img, toggle }) {
    return (
        <div className="box" style={{paddingLeft:"20px"}}>
            <div style={{width:"300px"}}><Info myname={myname} img={img}/></div>
            <PersonalBlog myname={myname} color={color} toggle={toggle} />
        </div>
    );
}