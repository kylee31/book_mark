import styled from "styled-components";

function CateLink({ link, id, title, txt, onLinkDel }) {

    return (
        <Div>
            <a className="link" href={link} target='_blank' rel="noreferrer">{title}</a>
            <DelButton onClick={() => { onLinkDel(id) }}>❌</DelButton>
            <LinkHr $txt={txt} />
            <Comment $txt={txt} >{txt}</Comment>
        </Div>
    )
}

export default CateLink;

//styled-components
const Div = styled.div`
    background-color: #fff;
    border-radius: 5px;
    margin-bottom:7px;
    @media screen and (max-width:600px){
        width:400px;
    }
`;

const Comment = styled.span`
    display: ${props => props.$txt === "" ? "none" : "display"};
    margin-left: 5px;
    padding: 0 5px;
    color: grey;
`;

const DelButton = styled.span`
    cursor: pointer;
    float:right;
`;

const LinkHr = styled.hr`
    display: ${props => props.$txt === "" ? "none" : "display"};
    background-color: #fff;
    border-top: 2px dotted #8c8b8b;
`