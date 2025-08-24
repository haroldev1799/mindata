import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HeroesProviders } from './modules/heroes/heroes.providers';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpErrorInterceptor } from './core/interceptors/interceptor-error';
import { HttpAuthInterceptor } from './core/interceptors/interceptor-http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const providers = [
  ...HeroesProviders
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providers,
    provideAnimationsAsync(),
	provideHttpClient(
		withInterceptorsFromDi(),
	),
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpErrorInterceptor,
		multi: true,
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpAuthInterceptor,
		multi: true,
	},
	{ provide: LOCALE_ID, useValue: 'es' }
  ]
};
