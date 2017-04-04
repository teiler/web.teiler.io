import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FooterComponent
  ],
  declarations: [FooterComponent]
})
export class SharedModule {
}
