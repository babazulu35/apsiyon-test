
// MAIN REDUCER
import  {ActionReducerMap,createFeatureSelector,createSelector} from '@ngrx/store';

import * as fromUi from './reducers/ui.reducer';
import * as fromRank from './reducers/rank.reducers';

export interface State {
    ui: fromUi.State,
    rank: fromRank.State
}

// Group Reducer
export const reducers: ActionReducerMap<State>= {
    ui: fromUi.uiReducer,
    rank: fromRank.RankReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getRankState = createFeatureSelector<fromRank.State>('rank');


// utility function
export const getIsLoading = createSelector(getUiState,fromUi.getIsLoading);

export const getRank = createSelector(getRankState,fromRank.getRank);