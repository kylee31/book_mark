import { authService } from "../fbase";

export const isLogin = () => !!authService.currentUser;