import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ErrorComponent } from './error/error.component';
import { AppMaterialModule } from "../app-material.module";

// Routing
import { UIRoute } from "./ui.routes";
import { RouterModule} from "@angular/router";
import {SharesComponent} from "./shares/shares.component";

@NgModule({
  declarations: [
    AccountComponent,
    HomeComponent,
    TopNavComponent,
    TransactionComponent,
    ErrorComponent,
    SharesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UIRoute),
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    TopNavComponent,
    HomeComponent,
    SharesComponent
  ],
  providers:[],
})
export class UiModule { }
