import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

const DEFAULT_TITLE = 'Screen'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  screenTitle: string = DEFAULT_TITLE;
  connected: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return DEFAULT_TITLE;
      })
    ).subscribe((title: string) => {
      this.screenTitle = title;
    });
  }
}
