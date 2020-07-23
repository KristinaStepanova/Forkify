import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isUserAuth: boolean = false;

  public get isUserAuth(): boolean {
    return this._isUserAuth || Boolean(localStorage.getItem("token"));
  }

  public set isUserAuth(isAuth: boolean) {
    this._isUserAuth = isAuth;
    localStorage.setItem("token", String(isAuth));
  }

  constructor(private afauth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.afauth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): Promise<any> {
    return this.afauth.createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<any> {
    return this.afauth.sendPasswordResetEmail(email);
  }
}
