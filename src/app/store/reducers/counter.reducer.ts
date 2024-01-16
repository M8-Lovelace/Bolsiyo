import { Pixabay } from '@models/pixabay.model';
import { createReducer, on } from '@ngrx/store';
import { save } from '../actions/counter.action';

const pixabayInitialState = {} as Pixabay;

export const pixabayReducer = createReducer(
  pixabayInitialState,
  on(save, (state, action) => {
    return { ...state, ...action.pixabay };
  })
);
