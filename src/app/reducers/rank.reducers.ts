import {Action} from '@ngrx/store';

import {RankActions, INCREASE_RANK,DECREASE_RANK,CURRENT_RANK} from '../actions/rank.actions';

export interface State {
    rank:any;
}

const initialState: State = {
    rank:0
}


export function RankReducer(state = initialState,action:RankActions) {
    switch(action.type) {
        case INCREASE_RANK:
        return {
            rank: action.payload + 1,
        }
        case DECREASE_RANK:
        return {
            rank: action.payload - 1,
        }
        case CURRENT_RANK:
            return {
                rank: action.payload,
            }
        default:
            return state;
    }
}

export const getRank = (state:State) => state.rank;