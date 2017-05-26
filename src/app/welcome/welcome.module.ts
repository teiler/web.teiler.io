import {ModuleWithProviders, NgModule} from "@angular/core";

import {SharedModule} from "app/shared";
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {DesignComponent, HomeComponent, WelcomeComponent} from "./component";
import {GroupModule} from "app/group";

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
