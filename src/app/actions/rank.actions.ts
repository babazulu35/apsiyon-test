import {Action} from '@ngrx/store';

export const INCREASE_RANK = '[RATE] Increase Rate';

export const DECREASE_RANK = '[RATE] Decrease Rate';

export class IncreaseRank implements Action {
    readonly type = INCREASE_RANK;
    constructor(public payload:number) {}
}

export class DecreaseRank implements Action {
    readonly type = DECREASE_RANK;
    constructor(public payload:number) {}
}

export type RankActions = IncreaseRank | DecreaseRank; 