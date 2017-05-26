import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent, ExpenseComponent, GroupComponent} from './component';
import {GroupEditComponent} from './component/group-edit/group-edit.component';
import {GroupResolverService} from './service/group-resolver.service';
import {CompensationComponent} from './component/compensation/compensation.component';
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
      {
        path: ':id/compensations/create',
        component: CompensationComponent,
        resolve: {group: GroupResolverService}
      },
      {
        path: ':id/compensations/:compensationId/edit',
        component: CompensationComponent,
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
