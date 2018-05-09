import {RateActions, INCREASE_RATE,DECREASE_RATE} from '../actions/rate.actions';

export interface State {
    rate:any;
}

const initialState: State = {
    rate:0
}


export function RateReducer(state = initialState,action:RateActions) {
    switch(action.type) {
        case INCREASE_RATE:
        return {
            rate: action.payload + 1,
        }
        case DECREASE_RATE:
       
        return {
            rate: state.rate <= 0 ? 0 : action.payload - 1,
        }
        default:
            return state;
    }
}

export const getRate = (state:State) => state.rate;