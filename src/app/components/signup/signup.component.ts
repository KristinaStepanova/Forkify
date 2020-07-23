import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //Init form
    this.loginForm = new FormGroup({
      emailFormControl: new FormControl("", [
        Validators.email,
        Validators.required,
      ]),
      passwordFormControl: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSignUp() {
    this.auth
      .signup(
        this.loginForm.value["emailFormControl"],
        this.loginForm.value["passwordFormControl"]
      )
      .then((res) => {
        this.router.navigate(["/login"]);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          this.openSnackBar(
            "",
            "The email address is already in use by another account."
          );
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top",
      horizontalPosition: "end",
      panelClass: ['snackbar-st']
    });
  }
}
