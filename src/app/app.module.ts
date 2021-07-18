import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { DualDialogComponent } from './components/dual-dialog/dual-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    DialogFormComponent,
    DualDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogFormComponent]
})
export class AppModule { }
