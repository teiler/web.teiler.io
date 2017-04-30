import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from 'app/shared';
import {GroupRoutingModule} from './group-routing.module';
import {GroupService, GroupStorageService, ExpenseService} from './service';
import {GroupResourceService, PersonResourceService, ExpenseResourceService} from './resource';
import {
  GroupComponent,
  DashboardComponent,
  GroupCreateComponent,
  GroupLoginComponent,
  GroupEditComponent,
  ExpenseComponent
} from './component';
import {GroupHeaderComponent} from './component/group-header/group-header.component';
import { CompensationComponent } from './component/compensation/compensation.component';

@NgModule({
  imports: [
    SharedModule,
    GroupRoutingModule
  ],
  declarations: [
    GroupCreateComponent, GroupLoginComponent, DashboardComponent, GroupComponent,
    GroupEditComponent, GroupHeaderComponent, ExpenseComponent, CompensationComponent
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
