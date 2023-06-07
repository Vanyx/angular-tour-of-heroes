// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HeroesComponent } from './heroes.component';

// describe('HeroesComponent', () => {
//   let component: HeroesComponent;
//   let fixture: ComponentFixture<HeroesComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HeroesComponent]
//     });
//     fixture = TestBed.createComponent(HeroesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    // Crée un mock du service HeroService
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero']);

    // Configure le module de test en utilisant le composant HeroesComponent et le mock du service
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
    }).compileComponents();
  });

  beforeEach(() => {
    // Crée une instance du composant HeroesComponent
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Vérifie que le composant a été créé avec succès
    expect(component).toBeTruthy();
  });

  it('should get heroes on component initialization', () => {
    // Définit un tableau de héros fictifs
    const mockHeroes: Hero[] = [{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }];

    // Configure le mock du service pour renvoyer les héros fictifs
    mockHeroService.getHeroes.and.returnValue(of(mockHeroes));

    // Appelle la méthode ngOnInit du composant
    component.ngOnInit();

    // Vérifie que les héros récupérés sont égaux aux héros fictifs
    expect(component.heroes).toEqual(mockHeroes);
  });

  it('should add a hero', () => {
    // Définit le nom du nouveau héros à ajouter
    const heroName = 'New Hero';

    // Crée un nouveau héros fictif
    const newHero: Hero = { id: 3, name: heroName };

    // Configure le mock du service pour renvoyer le nouveau héros fictif
    mockHeroService.addHero.and.returnValue(of(newHero));

    // Appelle la méthode add du composant en utilisant le nom du héros
    component.add(heroName);

    // Vérifie que le nouveau héros a été ajouté à la liste des héros
    expect(component.heroes).toContain(newHero);
  });
});
