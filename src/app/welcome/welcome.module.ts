import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {HomeComponent} from './component/home/home.component';
import {DesignComponent} from './component/design/design.component';
import {WelcomeComponent} from './component/welcome/welcome.component';
import {GroupModule} from '../group/group.module';

@NgModule({
  declarations: [HomeComponent, DesignComponent, WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,

    GroupModule
  ],
  exports: [
    WelcomeComponent
  ]

})
export class WelcomeModule {
}
