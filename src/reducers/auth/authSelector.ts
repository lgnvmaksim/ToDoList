import {AppRootStateType} from "../../store";

export const selectAuth = (state: AppRootStateType) => state.auth.isInitialized
