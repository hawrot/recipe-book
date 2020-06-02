import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string;
    registered?: boolean;

}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>();


    constructor(private http: HttpClient) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(environment.AUTH_SIGN_UP, {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuth(resData.email, resData.idToken, resData.localId, +resData.expiresIn)
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(environment.AUTH_LOGIN, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuth(resData.email, resData.idToken, resData.localId, +resData.expiresIn)
        }));
    }

    private handleAuth(email: string, token: string, userId: string, expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);

    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        console.log(errorRes);
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists'
                break;
             case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email not exists'
                break;
             case 'INVALID_PASSWORD':
                errorMessage = 'This password or email is invalid'
                break;

        }
        return throwError(errorMessage);
    }

}
