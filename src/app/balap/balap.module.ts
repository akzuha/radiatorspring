import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalapPageRoutingModule } from './balap-routing.module';

import { BalapPage } from './balap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalapPageRoutingModule
  ],
  declarations: [BalapPage]
})
export class BalapPageModule {}
