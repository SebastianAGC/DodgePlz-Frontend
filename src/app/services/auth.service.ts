import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { IUser } from "../models/user";
import { IJwtResponse } from "../models/jwt-response";
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject} from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()

export class AuthService {
  AUTH_SERVER = environment.api_url;
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) { }

  register(user:IUser): Observable<IJwtResponse>{
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
      (res:IJwtResponse) => {
        if(res){
          //guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        }
      }
    ))
  }

  login(user:IUser): Observable<IJwtResponse>{
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
      (res:IJwtResponse) => {
        if(res){
          //guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        }
      }
    ))
  }

  logout(): void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRE_IN");
  }

  private saveToken (token:string , expiresIn:string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRE_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN")
    }
    return this.token;
  }

}
