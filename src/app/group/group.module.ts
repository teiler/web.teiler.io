import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupRoutingModule} from './group-routing.module';
import {GroupCreateComponent} from './component/group-create/group-create.component';
import {FormsModule} from '@angular/forms';
import {GroupService} from './service/group.service';
import {GroupResourceService} from './resource/group-resource.service';
import { GroupLoginComponent } from './component/group-login/group-login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,

    FormsModule
  ],
  declarations: [GroupCreateComponent, GroupLoginComponent, DashboardComponent],
  exports: [
    GroupCreateComponent, GroupLoginComponent
  ],
  providers: [
    GroupService,
    GroupResourceService
  ]
})
export class GroupModule {
}
