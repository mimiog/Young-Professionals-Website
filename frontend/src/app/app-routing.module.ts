import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InfoFormComponent } from './infoForm/infoForm.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'info-form', component: InfoFormComponent},
  {path: 'confirmation-page', component: ConfirmationPageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'path'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
