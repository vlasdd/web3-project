import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  isLoading: Observable<boolean>;

  constructor(
    private loaderService: LoaderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoading = this.loaderService.isLoading;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loaderService.hide();
      }
    });
  }
}
