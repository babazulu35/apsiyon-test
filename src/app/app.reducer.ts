
// MAIN REDUCER
import  {ActionReducerMap,createFeatureSelector,createSelector} from '@ngrx/store';

import * as fromUi from './reducers/ui.reducer';
import * as fromRank from './reducers/rank.reducers';
import * as fromMovie from './reducers/movie.reducers';

export interface State {
    ui: fromUi.State,
    rank: fromRank.State,
    movie: fromMovie.State,
}

// Group Reducer
export const reducers: ActionReducerMap<State>= {
    ui: fromUi.uiReducer,
    rank: fromRank.RankReducer,
    movie: fromMovie.MovieReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getRankState = createFeatureSelector<fromRank.State>('rank');
export const getMovieState = createFeatureSelector<fromMovie.State>('movie');


// utility function
export const getIsLoading = createSelector(getUiState,fromUi.getIsLoading);
export const getRank = createSelector(getRankState,fromRank.getRank);
export const getMovie = createSelector(getMovieState,fromMovie.getMovie);