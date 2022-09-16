import { useNavigate } from "react-router-dom";

export default function BlogButton({ myname, color, toggle }) {

    const history = useNavigate();

    function main() {
        history(`/blog/${myname}`, { state: { myname: myname, text: "" } });
    }

    return (
        <button onClick={toggle ? main : undefined} style={{
            margin: "auto",
            backgroundColor: "#76c3ea",
            border: "0",
            boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.3)",
            width: "150px",
        }}>{myname} 블로그 방문</button>
    );
}