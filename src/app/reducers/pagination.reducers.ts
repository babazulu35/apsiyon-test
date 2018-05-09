import {PaginationActions,SHOW_NEXT_PAGE,SHOW_PREV_PAGE,SHOW_SELECTED_PAGE} from '../actions/pagination.actions';
import {Movies} from '../models/movies';

export interface State {
    pagination:any;
}

const initialState:State = {
    pagination:1
}

export function PaginationReducer(state = initialState, action:PaginationActions) {
    switch(action.type) {
        case SHOW_NEXT_PAGE:        
            return {
                pagination: state.pagination >= action.payload.totalPageSize ? action.payload.totalPageSize : state.pagination + 1
            }
        case SHOW_PREV_PAGE:
            return {
                pagination: state.pagination <= 1 ? 1: state.pagination - 1
            }
        case SHOW_SELECTED_PAGE:
            return  {
                pagination: state.pagination = action.payload
            }
        default:
            return state;
    }
}

export const getCurrentPage = (state:State) => state.pagination;