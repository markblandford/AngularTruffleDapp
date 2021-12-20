import { Routes } from '@angular/router';

// Components
import {AccountComponent} from "./account/account.component";
import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";
import { SharesComponent } from './shares/shares.component';
import {TransactionComponent} from "./transaction/transaction.component";

export const UIRoute: Routes = [
  { path: '', redirectTo: 'shares', pathMatch: 'full'},
  {path: 'shares', component: SharesComponent},
  { path: 'money', component: TransactionComponent },
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
