import { Component } from '@angular/core';
import { ContactMail } from '../../models/contact-mail';
import { MailService } from '../../services/mail.service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
    private _minStringLength: number = 3;
    public isSubmitted = false;
    public contact: ContactMail = {
        firstname: "",
        lastname: "",
        email: "",
        details: "",
        apiKey: "",
    }

    constructor(private _mailService: MailService) {}
    public onSubmit(){
        let isValid = true;
        let inputs = ['fname', 'email', 'details'];
        inputs.forEach((input) => {
            if(!this.validate(input)){
                isValid = false;             
            }
        });
        
        if(isValid){
            this.contact.apiKey = environment.apiKey;
            this._mailService.sendContactMail(this.contact).subscribe(res => {
                var contactSubmitted = document.getElementById('submitted') as HTMLInputElement;
                this.contact.apiKey = "";
                this.contact.details = "";
                this.contact.firstname = "";
                this.contact.lastname = "";
                this.contact.email = "";
                contactSubmitted.style.display = "block";
            },
            err => {
                console.log(err);
            });
        }
    }
    private validate(input: string): boolean{
        switch(input){
            case 'fname':
                var errFname = document.getElementById('error-fname') as HTMLElement;
                var fname = document.getElementById('fname') as HTMLInputElement;
                var reqFname = document.getElementById('required-fname') as HTMLElement;
                if(this.contact.firstname.length < this._minStringLength){
                    errFname.style.display = "block";
                    fname.style.borderBottomColor = "var(--third-color1)";
                    reqFname.style.color = "var(--third-color1)";
                    return false;
                } else {
                    errFname.style.display = "none";
                    fname.style.borderBottomColor = "var(--primary-color3)";
                    reqFname.style.color = "#fff";
                    return true;
                }
            case 'email':
                var errMail = document.getElementById('error-mail') as HTMLElement;
                var wrongMail = document.getElementById('wrong-mail') as HTMLElement;
                var mail = document.getElementById('email') as HTMLInputElement;
                var reqMail = document.getElementById('required-mail') as HTMLElement;
                if(this.contact.email === ''){
                    errMail.style.display = "block";
                    mail.style.borderBottomColor = "var(--third-color1)";
                    reqMail.style.color = "var(--third-color1)";
                    wrongMail.style.display = "none";
                    return false;
                } else {

                    if(!(String(mail.value).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))){
                        wrongMail.style.display = "block";
                        errMail.style.display = "none";
                        reqMail.style.color = "var(--third-color1)";
                        mail.style.borderBottomColor = "var(--third-color1)";
                        console.log("0");
                        return false;
                    } else{
                        wrongMail.style.display = "none";
                        errMail.style.display = "none";
                        reqMail.style.color = "#fff";
                        mail.style.borderBottomColor = "var(--primary-color3)";
                        return true;
                    }
                }
            case "details":
                var details = document.getElementById('details') as HTMLInputElement;
                var errDetails = document.getElementById('error-details') as HTMLInputElement;
                var reqDetails = document.getElementById('required-details') as HTMLInputElement;
                if(this.contact.details.length < this._minStringLength){
                    errDetails.style.display = "block";
                    details.style.borderBottomColor = "var(--third-color1)";
                    reqDetails.style.color = "var(--third-color1)";
                    return false;
                }
                return true;
            default:
                return false;
        }
    }
}
