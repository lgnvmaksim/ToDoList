import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./reducers/taskReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {todolistReducer} from "./reducers/todolistReducer";
import {appReducer} from "./reducers/appReducer";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector : TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store

