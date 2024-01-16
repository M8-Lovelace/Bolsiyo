import { Component, OnInit, inject } from '@angular/core';
import { Pixabay } from '@models/pixabay.model';
import { PixabayService } from '@services/pixabay.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [PixabayService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private pixabayService = inject(PixabayService);
  public response = {} as Pixabay;

  ngOnInit(): void {
    this.getImages();
  }

  private getImages(): void {
    this.pixabayService.getImages().subscribe((data) => {
      this.response = data;
    });
  }
}
