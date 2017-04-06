import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {WelcomeModule} from './welcome';
import {GroupModule} from './group';
import {CoreModule} from './core/core.module';
import {MockModule} from './mock/mock.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,

    // MockModule,

    CoreModule.forRoot(),
    WelcomeModule.forRoot(),
    GroupModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
