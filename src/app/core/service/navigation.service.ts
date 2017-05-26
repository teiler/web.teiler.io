import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export class NavigationService {

  constructor(private router: Router,
              private location: Location) {
  }

  public goToUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  public goBack(): void {
    this.location.back();
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

}
