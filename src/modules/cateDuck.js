import { collection, getDocs, query, where } from "@firebase/firestore";
import { authService, db } from "../fbase";

//액션 타입 정의
const CATE_GET = 'cate/CATE_GET';

//액션 생성 함수 정의
export const getCateData = (getData) => ({
    type: CATE_GET,
    data: getData
})

//초기 상태 정의
const initialState = {
    cateData: []
}

//reducer 정의
const cateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATE_GET: return {
            cateData: action.data
        }
        default: return state
    }
}

//비동기 액션 생성자 함수 작업
export const getFirebaseCateData = () => async (dispatch) => {
    try {
        const cate = collection(db, 'cate');
        authService.onAuthStateChanged(async (user) => {
            if (user) {
                const userUid = user.uid;
                const myData = query(cate, where("uid", "==", userUid));
                const querySnapshot = await getDocs(myData);
                const newData = [];
                querySnapshot.forEach((doc) => {
                    newData.push(doc.data());
                });
                await dispatch(getCateData(newData));
            } else {
                // console.log('User not logged in');
            }
        });
    } catch (error) {
        console.error('getCateData error', error);
    }
}

export default cateReducer;