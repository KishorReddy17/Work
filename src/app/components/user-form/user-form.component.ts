import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { DualDialogComponent } from '../dual-dialog/dual-dialog.component';

interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})




export class UserFormComponent implements OnInit {
  user: FormGroup;
  citizenShip: boolean = false;
  countriesList: Country[] = [
    { value: 'IND', viewValue: 'India' },
    { value: 'AF', viewValue: 'Africa' },
    { value: 'UK', viewValue: 'UK' }
  ];
  dialogData: any;
  ifDialogData: boolean;
  ifDualDialogData: boolean;
  dualDialogData: any;
  dualStatusSub: Subscription;
  countrySub: Subscription;

  constructor(private dailog: MatDialog,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.loadForm();
  }
  ngOnDestroy(){
    this.dualStatusSub.unsubscribe();
    this.countrySub.unsubscribe();
  }

  loadForm() {
    this.user = this.formBuilder.group({
      dStatus: ['No', Validators.required],
      country: [null, Validators.required]
    });
    this.handleFormChanges();
  }
  handleFormChanges() {

    this.dualStatusSub=this.user.get("dStatus").valueChanges.subscribe(data => {
      let config = new MatDialogConfig()

      if (data == 'Yes') {
        config.disableClose = true
        config.autoFocus = true
        this.ifDialogData = false
        let dialogRef = this.dailog.open(DualDialogComponent)
        dialogRef.afterClosed().subscribe(result => {
          this.ifDualDialogData = true;
          this.dualDialogData = result;


        });

      }
      else {
        this.ifDualDialogData = false;
        this.dailog.closeAll()
      }
    })

    this.countrySub=this.user.get("country").valueChanges.subscribe(data => {
      let config = new MatDialogConfig()
      config.disableClose = true
      config.autoFocus = true
      this.ifDialogData = false
      let dialogRef = this.dailog.open(DialogFormComponent)

      dialogRef.afterClosed().subscribe(result => {
        this.ifDialogData = true;
        this.dialogData = result;
      });
    })
  }


}









