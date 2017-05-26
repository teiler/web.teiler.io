import {ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LogService, NavigationService} from "./service";
import {TylrErrorService} from "./service/tylr-error.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: []
})
export class CoreModule {
  static forRoot(config?: {}): ModuleWithProviders {

    return {
      ngModule: CoreModule,
      providers: [
        // DI Providers (Services, Tokens, Factories...) to be used globally and instantiated only once
        NavigationService,
        LogService,
        TylrErrorService
      ]
    };
  }

  // Only the root AppModule should import the CoreModule. Bad things happen if a lazy loaded module imports it.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
