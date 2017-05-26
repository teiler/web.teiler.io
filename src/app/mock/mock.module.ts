import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./service/in-memory-data.service";

@NgModule({
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true
    })
  ],
  exports: [
    InMemoryWebApiModule
  ],
  declarations: []
})
export class MockModule {
}
