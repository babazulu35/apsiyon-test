import {Action} from '@ngrx/store';
import { Movies } from '../models/movies';

export const SORT_BY_RANK_DESCENT = '[SORT] Sort by rank descent ';

export const SORT_BY_RANK_ASCENT = '[SORT] Sort by ascent';

export const SORT_BY_TYPE = '[SORT] Sort by type';

export const GET_MOVIES = '[MOVIE] Get All Movie List';

export const CREATE_MOVIES = '[MOVIE] Create Movie';

export const REMOVE_MOVIES = '[MOVIE] Remove Movie by ID';

export const UPDATE_MOVIE_RATE = '[RATE] Update Movie Rate';


export class SortDescent implements Action {
    readonly type = SORT_BY_RANK_DESCENT;
    constructor(public payload:Movies[]) {}
}

export class SortAscent implements Action {
    readonly type = SORT_BY_RANK_ASCENT;

    constructor(public payload:Movies[]) {}
}

export class SortType implements Action {
    readonly type = SORT_BY_TYPE;
    constructor (public payload:Movies[]) {}
}

export class GetMovies implements Action {
    readonly type = GET_MOVIES;
    constructor(public payload:Movies[]){}
}

export class CreateMovie implements Action {
    readonly type = CREATE_MOVIES;
    constructor(public payload:Movies) {}
}

export class RemoveMovie implements Action {
    readonly type = REMOVE_MOVIES;
    constructor(public payload:string){}
}

export class UpdateMovieRate implements Action {
    readonly type = UPDATE_MOVIE_RATE;
    constructor(public payload:any) {}
}

export type MovieActions = SortDescent | SortAscent | SortType | GetMovies | CreateMovie | RemoveMovie | UpdateMovieRate;