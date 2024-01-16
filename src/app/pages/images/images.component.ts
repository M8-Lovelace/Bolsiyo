import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Pixabay, PixabayHit } from '@models/pixabay.model';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent implements OnInit {
  @Input() id!: string;

  private store = inject(Store<Pixabay>);
  private destroyRef = inject(DestroyRef);

  public item = {} as PixabayHit;

  ngOnInit(): void {
    this.getPixabayItem();
  }

  public getPixabayItem(): void {
    this.store
      .pipe(
        map<{ pixabay: Pixabay }, PixabayHit>((state) => {
          const item = state.pixabay.hits.find(
            (item) => item.id === parseInt(this.id)
          );
          return item as PixabayHit;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data: PixabayHit) => {
        this.item = data;
      });
  }
}
