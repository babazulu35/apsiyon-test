import { MovieActions,SORT_BY_RANK_ASCENT,SORT_BY_RANK_DESCENT,SORT_BY_TYPE,GET_MOVIES,REMOVE_MOVIES,CREATE_MOVIES, UPDATE_MOVIE_RATE } from './../actions/movie.actions';
import { Movies } from '../models/movies';

export interface State {
    movie:Movies[];
}

const initialState:State = {
    movie:[]
}

export function MovieReducer(state= initialState, action:MovieActions) {
    switch(action.type) {
        case SORT_BY_RANK_ASCENT:
        return {
            ...state,
            movie: action.payload
        }
        case SORT_BY_RANK_DESCENT:
            return {
                ...state,
                movie: action.payload
            }
        case SORT_BY_TYPE:
            return {
                ...state,
                movie: action.payload
            }
        case GET_MOVIES:
            return {
                ...state,
                movie: action.payload
            }
        case REMOVE_MOVIES:
            return {
                ...state,
                movie: state.movie.filter(result => result.id == action.payload )
            }
        case UPDATE_MOVIE_RATE:
            let find = state.movie.findIndex(result => result.id == action.payload.id);
            state.movie[find].rank = action.payload.rank;
            return {
                ...state,
                movie: state.movie
            }
        default:
            return state;
    } 
}

export const getMovie = (state:State) => state.movie;