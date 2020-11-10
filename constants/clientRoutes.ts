/**
 * An enum containing all the unique names of the routes
 */
export enum EClientRouteKeys {
  /**
   * Public
   */
  HOME = 'HOME',
}

/**
 * An object litteral with all the client routes
 */
export const clientRoutes = {
  /**
   * Public
   */
  [EClientRouteKeys.HOME]: {
    pathname: '/',
  },
};
