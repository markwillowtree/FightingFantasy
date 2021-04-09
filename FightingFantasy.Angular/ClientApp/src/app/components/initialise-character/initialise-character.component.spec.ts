import { Compiler, Injector, NgModuleFactoryLoader, Optional } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ChildrenOutletContexts, Router, ROUTER_CONFIGURATION, ROUTES, UrlHandlingStrategy, UrlSerializer } from '@angular/router';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { OidcSecurityServiceStub } from 'src/testing/oidc-security-service-stub';

import { InitialiseCharacterComponent } from './initialise-character.component';

describe('InitialiseCharacterComponent', () => {
  let component: InitialiseCharacterComponent;
  let fixture: ComponentFixture<InitialiseCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          []
          //[{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
        )
      ],
      declarations: [ InitialiseCharacterComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({playthroughId: 1})}},
        { provide: OidcSecurityService, useClass: OidcSecurityServiceStub},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialiseCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
