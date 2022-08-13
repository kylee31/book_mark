import InfoList from "./InfoList"
import blog from "../db/blog.json";

export default function BlogList() {
    
    return (
        blog.map((person, index) => {
            return <InfoList key={index} myname={person.name} color={person.color} toggle={true}/>
        })
    );
}