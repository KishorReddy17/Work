import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';
import { UserFormComponent } from '../user-form/user-form.component';

interface IDType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dual-dialog',
  templateUrl: './dual-dialog.component.html',
  styleUrls: ['./dual-dialog.component.css']
})
export class DualDialogComponent implements OnInit {

  // @Output() dialogData = new EventEmitter<any>();
  userRegister: FormGroup;
  notInTheList: boolean = false;
  close: boolean = false;
  child2: boolean = false;
  idsList: IDType[] = [
    { value: 'aadhar', viewValue: 'Aadhar' },
    { value: 'pancard', viewValue: 'pancard' },
    { value: 'notInList', viewValue: 'Not In The List' }
  ];
  radioSub: Subscription;
  dropDownSub: Subscription;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService,
    public matRef: MatDialogRef<UserFormComponent>) { }


  ngOnInit(): void {
    this.loadForm()
    this.handleFormChanges()

  }
  ngOnDestroy(): void {
    console.log("on destroy")
    this.radioSub.unsubscribe();
    this.dropDownSub.unsubscribe();
  }
  loadForm() {
    this.userRegister = this.formBuilder.group({
      status: ['US Citizen', Validators.required],
      idType: [null],
      noOfdaysIn2020: [null],
      noOfdaysIn2021: [null],
    });
  }

  handleFormChanges() {
    this.radioSub=this.userRegister.get("status").valueChanges.subscribe(data => {
      if (data == 'US Citizen') {
        this.notInTheList = false;
        this.userRegister.controls['idType'].reset();
        this.userRegister.controls["idType"].setValidators(null);
        this.userRegister.get('idType').updateValueAndValidity();
      } else {
        this.notInTheList = true;
        this.userRegister.controls["idType"].setValidators(Validators.required);
      }

    })
    this.dropDownSub=this.userRegister.get("idType").valueChanges.subscribe(data => {
      if (data == 'notInList') {
        this.child2 = true
        this.userRegister.controls["noOfdaysIn2020"].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);
        this.userRegister.controls["noOfdaysIn2021"].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);
      } else {
        this.child2 = false;
        this.userRegister.controls['noOfdaysIn2020'].reset();
        this.userRegister.controls["noOfdaysIn2020"].setValidators(null);
        this.userRegister.get('noOfdaysIn2020').updateValueAndValidity();
        this.userRegister.controls['noOfdaysIn2021'].reset();
        this.userRegister.controls["noOfdaysIn2021"].setValidators(null);
        this.userRegister.get('noOfdaysIn2021').updateValueAndValidity();

      }
    })

  }


  reset() {
    this.notInTheList = false
    this.close = false
    this.child2 = false
    this.userRegister.controls['status'].setValue('US Citizen')
  }

}
