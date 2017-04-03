import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent, HomeComponent, DesignComponent} from './component';

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
