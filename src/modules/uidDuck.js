import { authService } from "../fbase";

//액션 타입 만들기
const GET_UID = 'uid/GET_UID';

//액션 생성 함수 만들기
export const getUid = (uid) => ({
    type: GET_UID,
    userUid: uid
})

//초기 상태 정의
const initialState = {
    userUid: ""
};

//리듀서
export default function uidReducer(state = initialState, action) {
    switch (action.type) {
        case GET_UID: return {
            ...state,
            userUid: action.userUid
        }
        default: return state
    }
}

//비동기 작업 thunk
export const getUserUid = () => async (dispatch) => {
    try {
        //로그인한 user의 uid 찾기
        await authService.onAuthStateChanged(user => {
            if (user) {
                dispatch(getUid(authService.currentUser.uid));
            }
        })
    } catch (error) {
        console.log("getUid error")
    }
};