import { Pixabay } from '@models/pixabay.model';
import { createAction, props } from '@ngrx/store';

export const save = createAction(
  'Guardar datos de pixabay',
  props<{
    pixabay: Pixabay;
  }>()
);
