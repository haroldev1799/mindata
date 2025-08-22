import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesRepository } from '../domain/repository/heroes.repository';
import { URL_BACKEND } from '@app/core/config/url';

export class HeroesRepositoryService extends HeroesRepository {
	private readonly http = inject(HttpClient);
	private readonly router = inject(Router);

	protected authUrl = `${URL_BACKEND}/client`;


}
