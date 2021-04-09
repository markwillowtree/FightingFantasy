import { Compiler, Injector, NgModuleFactoryLoader, Optional } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';
import { ActivatedRoute, ChildrenOutletContexts, Router, ROUTER_CONFIGURATION, ROUTES, UrlHandlingStrategy, UrlSerializer } from '@angular/router';
import { RouterTestingModule, setupTestingRouter, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { OidcSecurityServiceStub } from 'src/testing/oidc-security-service-stub';

import { CreatePlaythroughComponent } from './create-playthrough.component';

describe('CreatePlaythroughComponent', () => {
  let component: CreatePlaythroughComponent;
  let fixture: ComponentFixture<CreatePlaythroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ CreatePlaythroughComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({bookId: 1})}},
        { provide: OidcSecurityService, useClass: OidcSecurityServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaythroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
