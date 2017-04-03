import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupComponent, DashboardComponent} from './component';

const routes: Routes = [
  {
    path: 'group', component: GroupComponent,
    children: [
      {path: '', component: DashboardComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
