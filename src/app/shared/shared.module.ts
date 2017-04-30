import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from './component/footer/footer.component';
import {AmountFormatPipe} from './pipe/amount-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    AmountFormatPipe
  ],
  declarations: [FooterComponent, AmountFormatPipe]
})
export class SharedModule {
}
