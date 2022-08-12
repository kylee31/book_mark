import InfoList from "./InfoList"
const blog = [
    {
        name: "kylee👩",
        color: "338899",
    },
    {
        name: "rain☔",
        color: "d3d3d3",
    },
    {
        name: "zzz😪",
        color: "fff3c2",
    },
    {
        name:"what💥",
        color:"ffc2c2"
    },{
        name:"happy💗",
        color:"ff9cf7"
    }
]

export default function BlogList() {
    
    return (
        blog.map((person, index) => {
            return <InfoList key={index} myname={person.name} color={person.color} />
        })
    );
}