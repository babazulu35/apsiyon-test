import {RankActions, INCREASE_RANK,DECREASE_RANK} from '../actions/rank.actions';

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
            rank: state.rank <= 0 ? 0 : action.payload - 1,
        }
        default:
            return state;
    }
}

export const getRank = (state:State) => state.rank;