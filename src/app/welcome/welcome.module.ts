import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomeComponent, HomeComponent, DesignComponent} from './component';
import {GroupModule} from '../group';

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
  static forRoot(config?: {}): ModuleWithProviders {
    return {
      ngModule: WelcomeModule,
      providers: []
    };
  }
}
