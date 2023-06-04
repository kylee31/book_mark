/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import Button from "../component/Button";
import CategoryList from "../component/CategoryList";
import CreateLink from "../component/CreateLink";

function MainPage() {

    function preventGoBack() {
        //브라우저 세션 기록 스택에 상태 추가 (복사본 저장)
        history.pushState(null, "", location.href);
    };

    useEffect(() => {
        preventGoBack();
        //window 객체에 popstate 이벤트 리스너 추가, 동일한 history.pushState로 복사본 저장
        window.addEventListener("popstate", preventGoBack);
    }, []);

    return (
        <div>
            <Button />
            <CreateLink />
            <CategoryList />
        </div>
    );
}

export default MainPage;