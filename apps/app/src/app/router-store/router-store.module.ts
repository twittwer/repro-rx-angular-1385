import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  NavigationActionTiming,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { routerReducer, ROUTER_FEATURE_KEY } from './router.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer),
    StoreRouterConnectingModule.forRoot({
      routerState: /* RouterState.Minimal */ 1,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
  ],
})
export class RouterStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: RouterStoreModule) {
    if (parentModule) {
      throw new Error(
        `${RouterStoreModule.name} is already loaded. Import it on root level only!`
      );
    }
  }
}
