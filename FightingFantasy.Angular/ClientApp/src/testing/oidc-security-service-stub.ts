import { OidcSecurityService } from "angular-auth-oidc-client";
import { AuthOptions } from "angular-auth-oidc-client/lib/login/auth-options";
import { of } from "rxjs";

export class OidcSecurityServiceStub {

    getToken() {
      return 'some_token_eVbnasdQ324';
    }
  
    checkAuth() {
      return of(true);
    }
  
    authorize(authOptions?: AuthOptions) {
      if (authOptions) {
        return authOptions.urlHandler('http://localhost');
      } else {
        return null;
      }
    }
  }