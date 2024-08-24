import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PrimeNGConfig } from 'primeng/api';
import { routes } from './app.routes';
import { loadingInterceptor } from './interceptors/loading.interceptor';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true,
    },
  ],
};
