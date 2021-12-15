import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule} from "../app-material.module";

// Components
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

// Routing
import { UIRoute } from "./ui.routes";
import { RouterModule} from "@angular/router";
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [
    HomeComponent,
    ErrorComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UIRoute),
    AppMaterialModule
  ],
  exports:[
    TopNavComponent,
  ],
  providers:[],
})
export class UiModule { }
