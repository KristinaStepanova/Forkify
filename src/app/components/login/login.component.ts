import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
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

  onLogin() {
    this.auth
      .login(
        this.loginForm.value["emailFormControl"],
        this.loginForm.value["passwordFormControl"]
      )
      .then((response) => {
        this.auth.isUserAuth = true;
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
