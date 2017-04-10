import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupComponent, DashboardComponent} from './component';
import {GroupEditComponent} from './component/group-edit/group-edit.component';

const routes: Routes = [
  {
    path: 'groups/:id', component: GroupComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'edit', component: GroupEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
