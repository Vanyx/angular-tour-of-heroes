import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let heroService: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });

    heroService = TestBed.inject(HeroService); // Récupère une instance du service HeroService
    httpMock = TestBed.inject(HttpTestingController); // Récupère une instance du simulateur de requêtes HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie que toutes les requêtes HTTP attendues ont été effectuées
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy(); // Vérifie que le service HeroService a été créé avec succès
  });

  it('should retrieve heroes from the API', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' }
    ];

    heroService.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes); // Vérifie que les héros renvoyés par le service sont égaux à mockHeroes
    });

    const req = httpMock.expectOne('api/heroes'); // S'attend à ce qu'une requête HTTP soit effectuée vers l'URL 'api/heroes'
    expect(req.request.method).toBe('GET'); // Vérifie que la méthode HTTP de la requête est GET

    req.flush(mockHeroes); // Simule la réponse HTTP en renvoyant les mockHeroes
  });
});
