import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from 'app/shared';
import {GroupRoutingModule} from './group-routing.module';

import {
  GroupComponent,
  DashboardComponent,
  GroupCreateComponent,
  GroupLoginComponent
} from './component';
import {GroupService, GroupStorageService} from './service';
import {GroupResourceService, PersonResourceService} from './resource';
import {GroupEditComponent} from './component/group-edit/group-edit.component';
import {GroupHeaderComponent} from './component/group-header/group-header.component';
import {ExpenseComponent} from './component/expense/expense.component';


@NgModule({
  imports: [
    SharedModule,

    GroupRoutingModule
  ],
  declarations: [
    GroupCreateComponent, GroupLoginComponent, DashboardComponent, GroupComponent,
    GroupEditComponent, GroupHeaderComponent, ExpenseComponent
  ],
  exports: [
    GroupCreateComponent, GroupLoginComponent, GroupComponent, ExpenseComponent
  ],
  providers: []

})
export class GroupModule {
  static forRoot(config?: {}): ModuleWithProviders {
    return {
      ngModule: GroupModule,
      providers: [
        GroupService,
        GroupResourceService,
        PersonResourceService,
        GroupStorageService
      ]
    };
  }
}
