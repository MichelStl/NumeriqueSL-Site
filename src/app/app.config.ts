import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes), 
        provideClientHydration(),
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.sitekey },
        {
          provide: RECAPTCHA_SETTINGS,
          useValue: {
            siteKey: environment.recaptcha.sitekey,
          } as RecaptchaSettings,
        },
    ]
};
