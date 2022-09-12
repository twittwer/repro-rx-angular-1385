import {
  Directive,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { select } from '@rx-angular/state/selections';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PanelState, PANEL_STATE } from './panel-state.provider';

@Directive({
  selector: '[appPanelIsOpen],[appPanelDisabled],[appPanelIsLoading]',
  providers: [{ provide: PANEL_STATE, useExisting: PanelStateDirective }],
})
export class PanelStateDirective extends PanelState implements OnChanges {
  @Input('appPanelIsOpen')
  public isOpen: boolean;
  @Output('appPanelIsOpenChange') // eslint-disable-line @angular-eslint/no-output-rename
  public readonly isOpenChange: Observable<boolean> = this.$.pipe(
    select('isOpen'),
    filter((isOpen) => isOpen !== this.isOpen)
  );

  @Input('appPanelDisabled')
  public disabled: boolean;
  @Output('appPanelDisabledChange') // eslint-disable-line @angular-eslint/no-output-rename
  public readonly disabledChange: Observable<boolean> = this.$.pipe(
    select('disabled'),
    filter((disabled) => disabled !== this.disabled)
  );

  @Input('appPanelIsLoading')
  public isLoading: boolean;
  @Output('appPanelIsLoadingChange') // eslint-disable-line @angular-eslint/no-output-rename
  public readonly isLoadingChange: Observable<boolean> = this.$.pipe(
    select('isLoading'),
    filter((isLoading) => isLoading !== this.isLoading)
  );

  public ngOnChanges({ isOpen, disabled, isLoading }: SimpleChanges): void {
    const changes: {
      isOpen?: boolean;
      disabled?: boolean;
      isLoading?: boolean;
    } = {};
    if (isOpen) {
      changes.isOpen = this.isOpen;
    }
    if (disabled) {
      changes.disabled = this.disabled;
    }
    if (isLoading) {
      changes.isLoading = this.isLoading;
    }
    if (Object.keys(changes).length) {
      this.set(changes);
    }
  }
}
