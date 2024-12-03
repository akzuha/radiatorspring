import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalapPage } from './balap.page';

const routes: Routes = [
  {
    path: '',
    component: BalapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalapPageRoutingModule {}
