import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Inject,
  TemplateRef,
} from '@angular/core';
import {
  PanelState,
  PANEL_STATE,
  PANEL_STATE_PROVIDER,
} from '../panel-state/panel-state.provider';

@Directive({
  selector: '[appPanelContent]',
})
export class PanelContentDirective {
  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}

@Component({
  selector: 'app-panel',
  host: { class: 'app-panel' },
  template: `
    <ng-content select="app-panel-header"></ng-content>
    <div *ngIf="isOpen$ | push" class="app-panel-content-wrapper">
      <ng-content></ng-content>
      <ng-container
        [ngTemplateOutlet]="panelContent?.templateRef || null"
      ></ng-container>
    </div>
  `,
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PANEL_STATE_PROVIDER],
})
export class PanelComponent {
  @ContentChild(PanelContentDirective)
  public readonly panelContent?: PanelContentDirective;

  /** @internal */
  public readonly isOpen$ = this.panelState.select('isOpen');

  constructor(@Inject(PANEL_STATE) private readonly panelState: PanelState) {}
}
