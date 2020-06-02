import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export interface AuthResponseData {
    kind :string,
    idToken: string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId: string;
    registered? : boolean;

}

@Injectable({providedIn: 'root'})
export class AuthService{


    constructor(private http: HttpClient) {
    }

    signUp(email: string, password: string){
       return this.http.post<AuthResponseData>(environment.AUTH_SIGN_UP, {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(err => {
            let errorMessage = 'An unknown error occurred';
            if(!err.error || !err.error.error){
                return throwError(errorMessage);
            }
           switch (err.error.error.message) {
               case 'EMAIL_EXISTS':
                   errorMessage = 'This email exists'
           }
            return throwError(errorMessage);
       }) );
    }

    login(email: string, password: string){
     return this.http.post<AuthResponseData>(environment.AUTH_LOGIN, {
         email: email,
         password: password,
         returnSecureToken: true
     })
    }

}
