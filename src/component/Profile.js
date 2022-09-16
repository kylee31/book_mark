import React from "react";

export default function Profile({ myname, img }) {

    return (
        <div className="id">
            <img className="profileImg" style={{margin:"auto"}} src={img} alt="" />
            <p style={{ paddingTop: "20px"}}>반갑습니다! {myname}입니다.</p>
        </div>
    )
}