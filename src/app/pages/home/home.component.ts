import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pixabay, PixabayCategory } from '@models/pixabay.model';
import { Store } from '@ngrx/store';
import { PixabayService } from '@services/pixabay.service';
import { Subject, debounceTime } from 'rxjs';
import { save } from '../../store/actions/counter.action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, ReactiveFormsModule],
  providers: [PixabayService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private pixabayService = inject(PixabayService);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store<Pixabay>);

  private input$ = new Subject<string>();

  // Class members
  private input!: string;
  private category!: PixabayCategory;
  public response = {} as Pixabay;
  public categoryForm = new FormControl('all', [Validators.required]);

  ngOnInit(): void {
    this.subscribeToInput();
    this.subscribeToCategory();
    this.getImages();
  }

  private getImages(query?: string, category?: PixabayCategory): void {
    this.pixabayService.getImages(query, category).subscribe((data) => {
      this.response = data;
      this.store.dispatch(save({ pixabay: data }));
    });
  }

  public saveInput(event: any): void {
    this.input = event.target.value;
    this.input$.next(this.input);
  }

  private subscribeToInput(): void {
    this.input$
      .pipe(debounceTime(1000), takeUntilDestroyed(this.destroyRef))
      .subscribe((query) => this.getImages(query));
  }

  private subscribeToCategory(): void {
    this.categoryForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((category) => {
        console.log(category);
        if (category) {
          if (category === 'all') {
            this.getImages(this.input);
          } else {
            this.category =
              PixabayCategory[category as keyof typeof PixabayCategory];
            this.getImages(this.input, this.category);
          }
        }
      });
  }
}
