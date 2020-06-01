import {Component, OnInit} from '@angular/core';
import {tokenReference} from "@angular/compiler";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLoginMode = true;

    constructor() {
    }


    ngOnInit(): void {
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        console.log(form.value);
        form.reset();
    }

}
