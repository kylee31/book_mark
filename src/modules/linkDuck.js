//링크 데이터 가져오기 카테고리명 매개변수로 받기
import { collection, getDocs, where, query } from "@firebase/firestore";
import { authService, db } from "../fbase";

//액션 타입 지정
const LINK_GET = 'link/LINK_GET';

//액션 생성 함수 생성
export const getLinkData = (getData) => ({
    type: LINK_GET,
    data: getData
})

//초기상태
const initialState = {
    linkData: []
}

//reducer
const linkReducer = (state = initialState, action) => {
    switch (action.type) {
        case LINK_GET: return {
            linkData: action.data
        }
        default: return state
    }
}

//redux-thunk
export const getFirebaseLinkData = ({ myname }) => async (dispatch) => {
    try {
        const flink = collection(db, 'link');
        const user = authService.currentUser;
        if (user) {
            const userUid = user.uid;
            const myData = query(flink, where("uid", "==", userUid));
            const querySnapshot = await getDocs(myData);
            let newData = [];
            await querySnapshot.docs.filter(doc => doc.data().name === myname).forEach((doc) => {
                newData.push(doc.data())
            });
            dispatch(getLinkData(newData))
        } else {
            // console.log('User not logged in');
        }
    }
    catch (error) {
        console.log(error)
    }
}

export default linkReducer;