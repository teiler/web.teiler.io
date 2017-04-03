import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome';
import {GroupComponent} from './group';

const appRoutes: Routes = [
  {
    path: '', component: WelcomeComponent, pathMatch: 'full'
  },
  {
    path: 'group', component: GroupComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
