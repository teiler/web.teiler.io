import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {GroupRoutingModule} from './group-routing.module';

import {
  GroupComponent,
  DashboardComponent,
  GroupCreateComponent,
  GroupLoginComponent
} from './component';

import {GroupService} from './service';
import {GroupResourceService} from './resource';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    GroupRoutingModule
  ],
  declarations: [
    GroupCreateComponent, GroupLoginComponent, DashboardComponent, GroupComponent
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
        GroupResourceService
      ]
    };
  }
}
