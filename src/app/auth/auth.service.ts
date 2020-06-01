import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService{


    constructor(private http: HttpClient) {
    }

    signUp(email: string, password: string){
        this.http.post(environment.AUTH_SIGN_UP, {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }

}
