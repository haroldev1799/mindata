import { APP_ROUTE_NAMES } from 'src/app/app.routenames';

export enum HEROE_ROUTE_NAMES {
	LIST = 'listado',
	REGISTER = 'crear',
	EDIT = 'editar'
}

export const HEROE_ROUTE_NAMES_GLOBAL = {
	LIST: `${APP_ROUTE_NAMES.HEROE}/${HEROE_ROUTE_NAMES.LIST}`,
	REGISTER: `${APP_ROUTE_NAMES.HEROE}/${HEROE_ROUTE_NAMES.REGISTER}`,
	EDIT: `${APP_ROUTE_NAMES.HEROE}/${HEROE_ROUTE_NAMES.EDIT}`,
};
