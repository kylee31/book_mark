import React from "react";
import profile from "../img/person.jpg";

export default function Info({ myname }) {

    return (
        <div className="id">
            <img style={{margin:"auto"}} src={profile} alt="" />
            <p style={{ paddingTop: "20px"}}>반갑습니다! {myname}입니다.</p>
        </div>
    )
}