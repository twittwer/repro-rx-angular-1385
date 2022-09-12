import {
  MinimalRouterStateSnapshot,
  routerReducer,
  RouterReducerState,
} from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export type RouterState = RouterReducerState<MinimalRouterStateSnapshot>;

export { routerReducer };
