import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FormControl, Validators } from "@angular/forms";

//reset password component
@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onReset() {
    this.auth
      .resetPassword(this.emailFormControl.value)
      .then((res) => {
        this.openDialog();
        this.router.navigate(["/login"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogResetPassword, {
      width: "480px",
      data: { email: this.emailFormControl.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}

//dialog data
interface DialogData {
  email: string;
}

//dialog component
@Component({
  selector: "dialog-reset-password",
  templateUrl: "./dialog-reset-password.component.html",
})
export class DialogResetPassword {
  constructor(
    public dialogRef: MatDialogRef<DialogResetPassword>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  email: string;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
