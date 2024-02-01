import { authService } from "../fbase";

export const isLogin = () => !!authService.currentUser;

/*콜백 함수 반환
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../fbase";
export const isLogin = () => onAuthStateChanged(authService, (user) => !!user);

import { getAuth, onAuthStateChanged } from "firebase/auth";

export const isLogin = () => {
    // return !!localStorage.getItem('firebase:authUser')
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        console.log("login")
        console.log(!!user)
        return !!user
    });
};*/