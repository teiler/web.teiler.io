import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupRoutingModule} from './group-routing.module';
import {GroupCreateComponent} from './component/group-create/group-create.component';
import {FormsModule} from '@angular/forms';
import {GroupService} from './service/group.service';
import {GroupResourceService} from './resource/group-resource.service';

@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,

    FormsModule
  ],
  declarations: [GroupCreateComponent],
  exports: [
    GroupCreateComponent
  ],
  providers: [
    GroupService,
    GroupResourceService
  ]
})
export class GroupModule {
}
