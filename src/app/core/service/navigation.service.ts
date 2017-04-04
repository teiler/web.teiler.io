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

  public goToDashboard(id: string): void {
    this.router.navigate(['/groups/', id]);
  }

  public goToGroupEdit(id: string): void {
    this.router.navigate(['/groups/', id, 'edit']);
  }

  constructor(private router: Router) {
  }
}
