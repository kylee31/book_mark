import { create } from "zustand";

export const useUserUid = create(set => ({
    userUid: null,
    setUserUid: (txt) => (set(() => ({ userUid: txt })))
}))