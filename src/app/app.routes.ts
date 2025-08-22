import { Routes } from '@angular/router';
import { APP_ROUTE_NAMES } from './app.routenames';

export const routes: Routes = [
	{
		path: APP_ROUTE_NAMES.HEROE,
		loadChildren: () => import('./modules/heroes/heroes.routes').then((m) => m.routes),
	},
	{
		path: '**',
		redirectTo: APP_ROUTE_NAMES.HEROE,
	},
];
