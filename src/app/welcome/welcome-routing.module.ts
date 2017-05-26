import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DesignComponent, HomeComponent, WelcomeComponent} from './component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'design', component: DesignComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
