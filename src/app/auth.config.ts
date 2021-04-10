import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
export const authConfig: AuthConfig = {

  oidc: false,

  // Login URL
  loginUrl: environment.apiUrl + '/auth',

  // Logout URL
  logoutUrl: environment.apiUrl + '/logout',

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.appLocation,

  silentRefreshRedirectUri: environment.appLocation,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: environment.apiClientId,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: '',

  /*/
  requireHttps: true,
  //*/
  requireHttps: false,
  //*/
}
