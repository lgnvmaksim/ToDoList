import {AppRootStateType} from "../../store";

export const selectTask = (state: AppRootStateType, todoId: string) =>  state.tasks[todoId]
