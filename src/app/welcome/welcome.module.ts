import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from 'app/shared';
import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomeComponent, HomeComponent, DesignComponent} from './component';
import {GroupModule} from '../group';


@NgModule({
  declarations: [HomeComponent, DesignComponent, WelcomeComponent],
  imports: [
    SharedModule,
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
