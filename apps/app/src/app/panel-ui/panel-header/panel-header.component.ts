import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  Inject,
  QueryList,
  TemplateRef,
} from '@angular/core';
import {
  PanelState,
  PANEL_STATE,
  PANEL_STATE_PROVIDER,
} from '../panel-state/panel-state.provider';

@Directive({
  selector: '[appPanelHeaderToggleIcon]',
})
export class PanelHeaderToggleIconDirective {}

@Directive({
  selector: '[appPanelHeaderTitle]',
})
export class PanelHeaderTitleDirective {}

@Directive({
  selector: '[appPanelHeaderAction]',
})
export class PanelHeaderActionDirective {}

@Component({
  selector: 'app-panel-header',
  host: { class: 'app-panel-header' },
  template: `
    <ng-template #defaultToggleIconTpl let-isOpen>
      {{ isOpen ? 'close' : 'open' }}
    </ng-template>
    <ng-template #defaultTitleTpl let-isOpen>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *rxLet="panelState.state$; let _panelState">
      <button
        class="btn btn-link app-panel-header__toggle"
        [title]="
          _panelState.isLoading
            ? 'loading...'
            : _panelState.isOpen
            ? 'close'
            : 'open'
        "
        [disabled]="_panelState.disabled || _panelState.isLoading"
        (click)="panelState.toggleIsOpen()"
      >
        <ng-container *ngIf="_panelState.isLoading; else toggleIcon">
          loading...
        </ng-container>
        <ng-template #toggleIcon>
          <ng-container
            [ngTemplateOutlet]="panelHeaderToggleIcon || defaultToggleIconTpl"
            [ngTemplateOutletContext]="{ $implicit: _panelState.isOpen }"
          ></ng-container>
        </ng-template>
      </button>
      <div class="app-panel-header__divider"></div>

      <div class="app-panel-header__title">
        <ng-container
          [ngTemplateOutlet]="panelHeaderTitle || defaultTitleTpl"
          [ngTemplateOutletContext]="{ $implicit: _panelState.isOpen }"
        ></ng-container>
      </div>

      <ng-container *ngFor="let panelHeaderAction of panelHeaderActions">
        <div class="app-panel-header__divider"></div>
        <ng-container
          [ngTemplateOutlet]="panelHeaderAction"
          [ngTemplateOutletContext]="{ $implicit: _panelState.isOpen }"
        ></ng-container>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PANEL_STATE_PROVIDER],
})
export class PanelHeaderComponent {
  @ContentChild(PanelHeaderToggleIconDirective, { read: TemplateRef })
  public readonly panelHeaderToggleIcon?: TemplateRef<PanelHeaderToggleIconDirective>;

  @ContentChild(PanelHeaderTitleDirective, { read: TemplateRef })
  public readonly panelHeaderTitle?: TemplateRef<PanelHeaderTitleDirective>;

  @ContentChildren(PanelHeaderActionDirective, { read: TemplateRef })
  public readonly panelHeaderActions: QueryList<
    TemplateRef<PanelHeaderActionDirective>
  >;

  constructor(@Inject(PANEL_STATE) public readonly panelState: PanelState) {}
}
