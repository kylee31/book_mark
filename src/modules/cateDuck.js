import { collection, getDocs, query, where } from "@firebase/firestore";
import { authService, db } from "../fbase";

//액션 타입 정의
const CATE_GET = 'cate/CATE_GET';
const CATE_POST = 'cate/CATE_POST';

//액션 생성 함수 정의
export const getCateData = (getData) => ({
    type: CATE_GET,
    data: getData
})
export const changeCateData = (changeData) => ({
    type: CATE_POST,
    data: changeData
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
        case CATE_POST: return {
            cateData: action.data
        }
        default: return state
    }
}

//비동기 액션 생성자 함수 작업
//onAuthStateChanged라는 비동기 함수를 받아서 사용
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

//currentUser를 받아서 사용
export const changeFirebaseCateData = () => async (dispatch) => {
    try {
        const cate = collection(db, 'cate');
        const user = authService.currentUser;
        if (user) {
            const userUid = user.uid;
            const myData = query(cate, where("uid", "==", userUid));
            const querySnapshot = await getDocs(myData);
            const newData = [];
            querySnapshot.forEach((doc) => {
                newData.push(doc.data());
            });
            await dispatch(changeCateData(newData));
        } else {
            // console.log('User not logged in');
        }
    } catch (error) {
        console.error('getCateData error', error);
    }
}

export default cateReducer;