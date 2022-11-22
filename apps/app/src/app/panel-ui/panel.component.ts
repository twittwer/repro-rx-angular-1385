import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetModule } from '@rx-angular/template';
import { PANEL_STATE, PANEL_STATE_PROVIDER } from './panel-state.provider';

@Component({
  standalone: true,
  imports: [NgIf, LetModule],
  selector: 'app-panel',
  template: `
    <ng-container *rxLet="_panelState.isOpen$; let isOpen">
      <button (click)="_panelState.toggleIsOpen()">
        {{ isOpen ? 'close' : 'open' }}
      </button>
      <div *ngIf="isOpen">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PANEL_STATE_PROVIDER],
})
export class PanelComponent {
  protected readonly _panelState = inject(PANEL_STATE);
}
