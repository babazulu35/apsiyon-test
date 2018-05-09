import {Action} from '@ngrx/store';

export const INCREASE_RATE = '[RATE] Increase Rate';

export const DECREASE_RATE = '[RATE] Decrease Rate';

export class IncreaseRate implements Action {
    readonly type = INCREASE_RATE;
    constructor(public payload:number) {}
}

export class DecreaseRate implements Action {
    readonly type = DECREASE_RATE;
    constructor(public payload:number) {}
}

export type RateActions = IncreaseRate | DecreaseRate; 