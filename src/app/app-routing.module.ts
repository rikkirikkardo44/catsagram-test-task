 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {CardCatalogComponent} from "./card-catalog/card-catalog.component";
 import {CreateCardFormComponent} from "./create-card-form/create-card-form.component";
 import {CardInfoComponent} from "./card-info/card-info.component";
 import {EditCardFormComponent} from "./edit-card-form/edit-card-form.component";

const routes: Routes = [
  {path: '', component: CardCatalogComponent},
  {path: 'create', component: CreateCardFormComponent},
  {path: 'info', component: CardInfoComponent},
  {path: 'edit', component: EditCardFormComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
