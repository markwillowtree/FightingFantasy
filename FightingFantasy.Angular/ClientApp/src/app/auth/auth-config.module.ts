import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';

export function configureAuth(oidcConfigService: OidcConfigService): () => Promise<any> {
    return () =>
        oidcConfigService.withConfig({
              stsServer: 'https://localhost:44370',
              redirectUrl: window.location.origin,
              postLogoutRedirectUri: window.location.origin,
              clientId: 'CustomerAngularClient',
              scope: 'openid profile CustomerScope', // 'openid profile offline_access ' + your scopes
              responseType: 'code',
              silentRenew: true,
              silentRenewUrl: `${window.location.origin}/assets/silent-renew.html`,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
          });
}

@NgModule({
    imports: [AuthModule.forRoot()],
    exports: [AuthModule],
    providers: [
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configureAuth,
            deps: [OidcConfigService],
            multi: true,
        },
    ],
})
export class AuthConfigModule {}
