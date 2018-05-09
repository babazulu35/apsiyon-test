import {Action} from '@ngrx/store';


export const SHOW_SELECTED_PAGE = '[PAGINATON] Show Selected Page';

export const SHOW_PREV_PAGE = '[PAGNATION] Show Previous Page';

export const SHOW_NEXT_PAGE = '[PAGINATION] Show Next Page';

export class ShowSelectedPage implements Action {
    readonly type = SHOW_SELECTED_PAGE;
    constructor(public payload:any) {}     
}

export class ShowPreviousPage implements Action {
    readonly type = SHOW_PREV_PAGE;   
}

export class ShowNextPage implements Action {
    readonly type = SHOW_NEXT_PAGE;
    constructor(public payload:{totalPageSize:any}) {}
       
}

export type PaginationActions = ShowSelectedPage | ShowPreviousPage | ShowNextPage;