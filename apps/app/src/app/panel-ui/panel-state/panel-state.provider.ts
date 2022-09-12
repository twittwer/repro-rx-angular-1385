import { InjectionToken, Optional, Provider, SkipSelf } from '@angular/core';
import { RxState } from '@rx-angular/state';

export class PanelState extends RxState<{
  isOpen: boolean;
  disabled: boolean;
  isLoading: boolean;
}> {
  public readonly state$ = this.select();

  constructor() {
    super();
    this.set({
      isOpen: true,
      disabled: false,
      isLoading: false,
    });
  }

  public toggleIsOpen(): void {
    this.set(({ isOpen }) => ({ isOpen: !isOpen }));
  }
}

export const PANEL_STATE = new InjectionToken<PanelState>('APP.PANEL_STATE');

export const PANEL_STATE_PROVIDER: Provider = {
  provide: PANEL_STATE,
  deps: [[new Optional(), new SkipSelf(), PANEL_STATE]],
  useFactory: (panelState?: PanelState) => panelState ?? new PanelState(),
};
