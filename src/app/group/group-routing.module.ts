import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupComponent, DashboardComponent, ExpenseComponent} from './component';
import {GroupEditComponent} from './component/group-edit/group-edit.component';
import {GroupResolverService} from './service/group-resolver.service';
import {SuggestPaymentsComponent} from './component/suggest-payments/suggest-payments.component';

const routes: Routes = [
  {
    path: 'groups', component: GroupComponent,
    children: [
      {path: ':id', component: DashboardComponent, resolve: {group: GroupResolverService}},
      {path: ':id/edit', component: GroupEditComponent, resolve: {group: GroupResolverService}},
      {
        path: ':id/expenses/create',
        component: ExpenseComponent,
        resolve: {group: GroupResolverService}
      },
      {
        path: ':id/expenses/:expenseId/edit',
        component: ExpenseComponent,
        resolve: {group: GroupResolverService}
      },
      {path: ':id/suggest-payments', component: SuggestPaymentsComponent, resolve: {group: GroupResolverService}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GroupResolverService
  ]
})
export class GroupRoutingModule {
}
