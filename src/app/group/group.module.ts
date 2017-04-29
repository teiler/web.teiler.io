import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from 'app/shared';
import {GroupRoutingModule} from './group-routing.module';
import {GroupService, GroupStorageService, ExpenseService} from './service';
import {
  GroupComponent,
  DashboardComponent,
  GroupCreateComponent,
  GroupLoginComponent,
  GroupEditComponent,
  GroupHeaderComponent,
  ExpenseComponent
} from './component';

import {GroupResourceService, PersonResourceService, ExpenseResourceService} from './resource';

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
    GroupCreateComponent, GroupLoginComponent, GroupComponent
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
        GroupStorageService,
        ExpenseResourceService,
        ExpenseService
      ]
    };
  }
}
