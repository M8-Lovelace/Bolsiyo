import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const pages: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'image/:id',
    loadComponent: () =>
      import('./images/images.component').then((m) => m.ImagesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
