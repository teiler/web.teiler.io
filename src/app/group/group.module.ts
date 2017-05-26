import {ModuleWithProviders, NgModule} from '@angular/core';

import {SharedModule} from 'app/shared';
import {GroupRoutingModule} from './group-routing.module';
import {ExpenseService, GroupService, GroupStorageService} from './service';
import {ExpenseResourceService, GroupResourceService, PersonResourceService} from './resource';
import {
  DashboardComponent,
  ExpenseComponent,
  GroupComponent,
  GroupCreateComponent,
  GroupEditComponent,
  GroupLoginComponent
} from './component';
import {GroupHeaderComponent} from './component/group-header/group-header.component';
import {CompensationComponent} from './component/compensation/compensation.component';
import {CompensationResourceService} from './resource/compensation-resource.service';
import {CompensationService} from './service/compensation.service';
import {SuggestPaymentsComponent} from './component/suggest-payments/suggest-payments.component';

@NgModule({
  imports: [
    SharedModule,
    GroupRoutingModule
  ],
  declarations: [
    GroupCreateComponent, GroupLoginComponent, DashboardComponent, GroupComponent,
    GroupEditComponent, GroupHeaderComponent, ExpenseComponent, CompensationComponent, SuggestPaymentsComponent
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
        ExpenseService,
        CompensationResourceService,
        CompensationService
      ]
    };
  }
}
