//링크 데이터 가져오기 카테고리명 매개변수로 받기

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
export const getFirebaseLinkData = () => async (dispatch) => {
    try {

    }
    catch (error) {
        console.log(error)
    }
}


export default linkReducer;