import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { pixabayReducer } from './store/reducers/counter.reducer';

// Set StoreModule.forRoot() in app.module.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    importProvidersFrom(HttpClientModule),
    provideStore({
      pixabay: pixabayReducer,
    }),
  ],
};
