import { Compiler, Injector, NgModuleFactoryLoader, Optional } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildrenOutletContexts, Router, ROUTER_CONFIGURATION, ROUTES, UrlHandlingStrategy, UrlSerializer } from '@angular/router';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { OidcSecurityServiceStub } from 'src/testing/oidc-security-service-stub';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: OidcSecurityService, useClass: OidcSecurityServiceStub},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
