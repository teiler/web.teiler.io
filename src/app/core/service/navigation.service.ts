import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class NavigationService {

  public goToUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  public goHome(): void {
    this.goToUrl('/');
  }

  public goToDashboard(): void {
    this.goToUrl('/dashboard');
  }

  constructor(private router: Router) {
  }
}
