import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupComponent, DashboardComponent} from './component';

const routes: Routes = [
  {
    path: 'groups', component: GroupComponent,
    children: [
      {path: ':id', component: DashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
