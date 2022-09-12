import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterState, ROUTER_FEATURE_KEY } from './router.reducer';

type Params = Record<string, string>;

export const selectRouterStore =
  createFeatureSelector<RouterState>(ROUTER_FEATURE_KEY);

// export const {
//     selectCurrentRoute,
//     selectQueryParams,
//     selectQueryParam,
//     selectRouteParams,
//     selectRouteParam,
//     selectRouteData,
//     selectUrl,
// } = getSelectors(selectRouterStore);

const selectRouterStoreState = createSelector(selectRouterStore, (router) =>
  router ? router.state : undefined
);

const selectAggregatedRouterState = createSelector(
  selectRouterStoreState,
  (routerState) => {
    if (!routerState) {
      return undefined;
    }

    let route = routerState.root;
    let params: Params /* MinimalActivatedRouteSnapshot['params'] */ =
      routerState.root.params;
    let queryParams: Params /* MinimalActivatedRouteSnapshot['queryParams'] */ =
      routerState.root.queryParams;
    while (route.firstChild) {
      route = route.firstChild;
      params = {
        ...params,
        ...route.params,
      };
      queryParams = {
        ...queryParams,
        ...route.queryParams,
      };
    }
    return {
      route,
      params,
      queryParams,
    };
  }
);

export const selectUrl = createSelector(selectRouterStoreState, (routerState) =>
  routerState ? routerState.url : undefined
);

export const selectCurrentRoute = createSelector(
  selectAggregatedRouterState,
  (routerState) => (routerState ? routerState.route : undefined)
);

export const selectRouteParams = createSelector(
  selectAggregatedRouterState,
  (routerState) => (routerState ? routerState.params : undefined)
);

export const selectRouteParam = (param: string) =>
  createSelector(selectRouteParams, (params) =>
    params ? params[param] : undefined
  );

export const selectQueryParams = createSelector(
  selectAggregatedRouterState,
  (routerState) => (routerState ? routerState.queryParams : undefined)
);

export const selectQueryParam = (param: string) =>
  createSelector(selectQueryParams, (queryParams) =>
    queryParams ? queryParams[param] : undefined
  );
