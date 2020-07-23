//Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
//Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import {
  ResetPasswordComponent,
  DialogResetPassword,
} from "./components/reset-password/reset-password.component";
import { SignupComponent } from "./components/signup/signup.component";
//Environment
import { environment } from "../environments/environment";
//Services
import { AuthService } from "./services/auth.service";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SearchComponent } from "./components/search/search.component";
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    SignupComponent,
    DialogResetPassword,
    NavbarComponent,
    SearchComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
