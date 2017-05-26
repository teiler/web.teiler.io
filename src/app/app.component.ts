import {Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'tylr-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
