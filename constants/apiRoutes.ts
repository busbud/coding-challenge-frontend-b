import { EHTTPVerbs } from './httpVerbs';

export enum EAPIRouteKeys {
  /**
   * Health check
   */
  HEALTH_CHECK = 'HEALTH_CHECK',

  /**
   * Tickets data
   */
}

export const apiRoutes = {
  /**
   * Health check
   */
  [EAPIRouteKeys.HEALTH_CHECK]: {
    pathname: 'health-check',
    method: EHTTPVerbs.GET,
  },

  /**
   * Tickets data
   */
  // [EAPIRouteKeys.AUTH_ASK_LOGIN_CODE]: {
  //   pathname: 'auth/ask-login-code',
  //   method: EHTTPVerbs.POST,
  // },
};
