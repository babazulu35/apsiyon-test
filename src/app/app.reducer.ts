
// MAIN REDUCER
import  {ActionReducerMap,createFeatureSelector,createSelector} from '@ngrx/store';

import * as fromUi from './reducers/ui.reducer';
import * as fromRate from './reducers/rate.reducers';
import * as fromMovie from './reducers/movie.reducers';
import * as fromPagination from './reducers/pagination.reducers';

export interface State {
    ui: fromUi.State,
    rate: fromRate.State,
    movie: fromMovie.State,
    pagination: fromPagination.State,
}

// Group Reducer
export const reducers: ActionReducerMap<State>= {
    ui: fromUi.uiReducer,
    rate: fromRate.RateReducer,
    movie: fromMovie.MovieReducer,
    pagination: fromPagination.PaginationReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getRateState = createFeatureSelector<fromRate.State>('rate');
export const getMovieState = createFeatureSelector<fromMovie.State>('movie');
export const getPaginationState = createFeatureSelector<fromPagination.State>('pagination');


// utility function
export const getIsLoading = createSelector(getUiState,fromUi.getIsLoading);
export const getRate = createSelector(getRateState,fromRate.getRate);
export const getMovie = createSelector(getMovieState,fromMovie.getMovie);
export const getCurrentPage = createSelector(getPaginationState,fromPagination.getCurrentPage)