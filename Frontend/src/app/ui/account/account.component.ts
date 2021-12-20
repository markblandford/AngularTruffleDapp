import { ContractService } from "../../services/contract.service";
import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
  direction: any;
  balance: string | undefined;
  profile: any;
  url: any;
  data: any;

  constructor(
    private contract: ContractService,
    private sanitizer: DomSanitizer) {
    this.contract
      .connectAccount()
      .then((value: any) => {
        console.log(value);
        this.direction = value;
        this.getDetails(this.direction);
        /* this.profile = this.threebox.getProfile(this.direction).then((response) => {
             console.log(response);
             this.profile = response;
             this.url = this.profile.image[0].contentUrl["/"];
           }); */
        this.getImage();
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }

  getImage() {
    /* this.data = this.sanitizer.bypassSecurityTrustResourceUrl(
       "data:image/svg+xml; utf8," +
       encodeURI(
         new Identicon(Md5.hashStr(account), {
           size: 32,
           format: "svg",
         }).toString(true)
       )
     ); */
  }

  navigateTo() {
    window.open("https://metamask.io/");
  }

  connectAccount() {
    this.contract
      .connectAccount()
      .then((value: any) => {
        console.log(value);
        this.direction = value;
        this.getDetails(this.direction);
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }

  getDetails(account: string | any[]) {
    this.contract
      .accountInfo(account)
      .then((value: any) => {
        this.balance = value;
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }
}
