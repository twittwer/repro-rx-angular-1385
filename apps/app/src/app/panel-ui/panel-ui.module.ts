import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule, PushModule } from '@rx-angular/template';
import {
  PanelHeaderActionDirective,
  PanelHeaderComponent,
  PanelHeaderTitleDirective,
  PanelHeaderToggleIconDirective,
} from './panel-header/panel-header.component';
import { PanelStateDirective } from './panel-state/panel-state.directive';
import { PanelComponent, PanelContentDirective } from './panel/panel.component';

const PANEL_HEADER = [
  // prettier-ignore
  PanelHeaderComponent,
  PanelHeaderToggleIconDirective,
  PanelHeaderTitleDirective,
  PanelHeaderActionDirective,
];

const DECLARATIONS = [
  // prettier-ignore
  PanelStateDirective,
  PanelComponent,
  ...PANEL_HEADER,
  PanelContentDirective,
];

@NgModule({
  imports: [CommonModule, PushModule, LetModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class PanelUiModule {}
