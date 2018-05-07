import {Action} from '@ngrx/store';

export const INCREASE_RANK = '[RATE] Increase Rank';

export const DECREASE_RANK = '[RATE] Decsrease Rank';

export const CURRENT_RANK = ' [RATE] Current Rank';

export class IncreaseRank implements Action {
    readonly type = INCREASE_RANK;
    constructor(public payload:number) {}
}

export class DecreaseRank implements Action {
    readonly type = DECREASE_RANK;
    constructor(public payload:number) {}
}

export class CurrentRank implements Action {
    readonly type = CURRENT_RANK;

    constructor(public payload:number) {}
}

export type RankActions = IncreaseRank | DecreaseRank | CurrentRank; 