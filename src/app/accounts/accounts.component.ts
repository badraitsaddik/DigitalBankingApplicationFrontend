import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup!: FormGroup;
  currentPage : number = 0;
  size : number = 5;
  accountObservable! : Observable<AccountDetails>
  operationFormGroup!: FormGroup;
  errorMessage! :string;
  constructor(private fb: FormBuilder,private accountService: AccountsService, private router: Router, private authService: AuthService) {
    }
    ngOnInit(): void {
        this.accountFormGroup = this.fb.group({
            accountId : this.fb.control("")

        });
        this.operationFormGroup = this.fb.group({
            amount : this.fb.control(0),
            operationType : this.fb.control(null),
            description : this.fb.control(null),
            DestinationAccount : this.fb.control(null),
        })}

  handleSearchAccount() {
      let accountId: string = this.accountFormGroup.value.accountId;
      this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.size).pipe(
          catchError((err) => {
                  this.errorMessage = err.message;
                  return throwError(err);
              })
      );

  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();

  }

  handleAccountOperations() {
    let accountId : string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount : number = this.operationFormGroup.value.amount;
    let description : string = this.operationFormGroup.value.description;
    let DestinationAccount : string = this.operationFormGroup.value.DestinationAccount;
    if(operationType == 'DEBIT'){
     this.accountService.debit(accountId, amount, description).subscribe(
       {
         next : (data) => {
           alert("Debit operation completed");
           this.operationFormGroup.reset();
            this.handleSearchAccount();
         },
          error : (err) => {
           console.log(err);
          }

       });
   }else if(operationType == 'CREDIT'){
     this.accountService.credit(accountId,amount,description).subscribe(
       {
        next : (data) => {
          alert("Credit operation completed");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error : (err) => {
          console.log(err);
        }
      });
    }
    else if(operationType == 'TRANSFER'){
     this.accountService.transfer(accountId,DestinationAccount,amount,description).subscribe({
        next : (data) => {
          alert("Transfer operation completed");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error : (err) => {
          console.log(err);
        }
     });
   }
  }
}
