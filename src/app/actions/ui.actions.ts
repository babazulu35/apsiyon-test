import { Action } from "@ngrx/store/src/models";

export const START_LOADING = '[LOADING] Start Loading';
export const STOP_LOADING = '[LOADING] Stop Loading';

export class StartLoading implements Action {
    readonly type = START_LOADING;
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;