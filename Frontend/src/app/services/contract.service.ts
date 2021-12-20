import {Inject, Injectable} from '@angular/core';
import { WEB3 } from '../core/web3';
import contract from '@truffle/contract';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

declare let require: any;
const tokenAbi = require('../../../../Blockchain/build/contracts/Payment.json');
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  public accountsObservable = new Subject<string[]>();
  public compatible: boolean | undefined;
  web3Modal;
  web3js: any | undefined;
  provider: any;
  accounts: any;
  balance: any;

  constructor(@Inject(WEB3) private web3: Web3 ,private snackbar: MatSnackBar) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }


  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }

  async accountInfo(accounts: string | any[]){
    const initialvalue = await this.web3js.eth.getBalance(accounts[0]);
    this.balance = this.web3js.utils.fromWei(initialvalue , 'ether');
    return this.balance;
  }


  trasnferEther(originAccount: any[], destinyAccount: any, amount: any) {
    const that = this;

    return new Promise((resolve, reject) => {
      const paymentContract = contract(tokenAbi);
      paymentContract.setProvider(this.provider);
      paymentContract.deployed().then((instance: { nuevaTransaccion: (arg0: any, arg1: { from: any; value: any; }) => any; }) => {
        let finalAmount =  this.web3.utils.toBN(amount)
        console.log(finalAmount)
        return instance.nuevaTransaccion(
          destinyAccount,
          {
            from: originAccount[0],
            value: this.web3.utils.toWei(finalAmount, 'ether')
          }
        );
      }).then((status: any) => {
        if (status) {
          return resolve({status: true});
        }
      }).catch((error: any) => {
        console.log(error);

        return reject('Error transfering Ether');
      });
    });
  }


  failure(message: string) {
    const snackbarRef = this.snackbar.open(message);
    snackbarRef.dismiss()
  }

  success() {
    const snackbarRef = this.snackbar.open('Transaction complete successfully');
    snackbarRef.dismiss()
  }
}
