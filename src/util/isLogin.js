//authService.currentUser 사용 시 새로고침마다 Firebase는 사용자 인증 상태를 다시 확인하고, 
//이 프로세스가 완료되기 전에는 currentUser가 null로 설정되어 로그인 페이지로 돌아가게 됨

import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../fbase";

//로그인 시 access Token 저장하여 Token으로 인가하기
export const isLogin = () => onAuthStateChanged(authService, (user) => !!user);

/*콜백 함수 반환
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../fbase";
export const isLogin = () => onAuthStateChanged(authService, (user) => !!user);*/