/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import Button from "../component/Button";
import CategoryList from "../component/CategoryList";
import CreateLink from "../component/CreateLink";
import { useDispatch, useSelector } from "react-redux";
import { getUserUid } from "../modules/uidDuck";
import { getFirebaseCateData } from "../modules/cateDuck";

function MainPage() {

    //userUid 저장하기 (전역 사용하기 위해)
    const { userUid } = useSelector(state => state.uid)
    const dispatch = useDispatch();
    const setUserUid = () => dispatch(getUserUid());

    //cate 데이터 불러오기
    const { cateData } = useSelector(state => state.cate);
    const setGetFirebaseCateData = () => dispatch(getFirebaseCateData());

    function preventGoBack() { //뒤로 가기 방지
        history.pushState(null, "", location.href); //브라우저 세션 기록 스택에 상태 추가 (복사본 저장)
    };

    useEffect(() => {
        if (userUid === "") setUserUid(); //userUid 한번 불러오기
        if (cateData) setGetFirebaseCateData(); //초기에 한번 불러오고 cateData가 존재한다면 state변경x
        preventGoBack();
        window.addEventListener("popstate", preventGoBack); //window 객체에 popstate 이벤트 리스너 추가, 동일한 history.pushState로 복사본 저장
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