import { inject, InjectionToken, Provider } from '@angular/core';
import { RxState } from '@rx-angular/state';

export class PanelState extends RxState<{
  isOpen: boolean;
}> {
  public readonly state$ = this.select();
  public readonly isOpen$ = this.select('isOpen');

  constructor() {
    super();
    this.set({
      isOpen: true,
    });
  }

  public toggleIsOpen(): void {
    this.set(({ isOpen }) => ({ isOpen: !isOpen }));
  }
}

export const PANEL_STATE = new InjectionToken<PanelState>('APP.PANEL_STATE');

export const PANEL_STATE_PROVIDER: Provider = {
  provide: PANEL_STATE,
  useFactory: () =>
    inject(PANEL_STATE, { optional: true, skipSelf: true }) ?? new PanelState(),
};
