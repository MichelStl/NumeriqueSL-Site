import { Injectable } from '@angular/core';
import { ContactMail } from '../models/contact-mail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private _http: HttpClient) { }
  public sendContactMail(contact: ContactMail): Observable<ContactMail> {

    return this._http.post<ContactMail>(`${environment.apiUrl}/api/mail/`, contact);
}
}
