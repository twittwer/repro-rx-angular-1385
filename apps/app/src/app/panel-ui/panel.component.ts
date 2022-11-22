import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { PANEL_STATE, PANEL_STATE_PROVIDER } from './panel-state.provider';

@Component({
  standalone: true,
  imports: [NgIf, PushModule],
  selector: 'app-panel',
  template: `
    <button (click)="_panelState.toggleIsOpen()">
      {{ (_panelState.isOpen$ | push) ? 'close' : 'open' }}
    </button>
    <div *ngIf="_panelState.isOpen$ | push">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PANEL_STATE_PROVIDER],
})
export class PanelComponent {
  protected readonly _panelState = inject(PANEL_STATE);
}
