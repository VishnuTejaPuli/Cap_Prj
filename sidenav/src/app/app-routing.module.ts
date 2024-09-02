import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NaturalDisastersComponent } from './natural-disasters/natural-disasters.component';
import { AccidentsComponent } from './accidents/accidents.component';
import { WomensafetyComponent } from './womensafety/womensafety.component';
import { HelplineComponent } from './helpline/helpline.component';
import { ChildsafetyComponent } from './childsafety/childsafety.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard',pathMatch:'full'},
  {path: 'dashboard',component: DashboardComponent},
  {path: 'natural-disasters',component: NaturalDisastersComponent},
  {path: 'accidents',component: AccidentsComponent },
  {path: 'womensafety',component: WomensafetyComponent },
  {path: 'childsafety',component: ChildsafetyComponent },
  {path: 'helpline', component: HelplineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
