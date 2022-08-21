import InfoList from "./InfoList"
//import blog from "../db/blog.json";
import { useEffect, useState } from "react";

export default function BlogList() {
    
    //dummy data 대신 json server 사용해서 data 받아오기(rest api)
    const [blog,setBlog]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:3001/users")
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            setBlog(data);
        })
    },[])

    return (
        blog.map((person, index) => {
            return <InfoList key={index} myname={person.name} color={person.color} img={person.img} toggle={true}/>
        })
    );
}