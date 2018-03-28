import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiagnosticToolsComponent }   from './diagnostic-tools/diagnostic-tools.component';



const routes: Routes = [
  { path: '', redirectTo: '/diagnostic-tools', pathMatch: 'full' },
  { path: 'diagnostic-tools', component: DiagnosticToolsComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
