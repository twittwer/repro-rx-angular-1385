import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { LetModule } from '@rx-angular/template';
import { PanelComponent } from '../panel-ui';
import { Todo } from './todo';

@Component({
  standalone: true,
  imports: [LetModule, PanelComponent],
  selector: 'app-description-panel',
  template: `
    <app-panel *rxLet="_state$; let state">
      <input type="text" [value]="state.value" (focus)="_onEdit()" />
    </app-panel>
  `,
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionPanelComponent {
  protected readonly _state$ = this._state.select();

  @Input()
  public set todo(todo: Todo) {
    this._state.set({
      /*mode: 'view',*/
      value: todo.description ?? '',
    });
  }

  constructor(
    private readonly _state: RxState<{
      /* mode: 'view' | 'edit'; */
      value: string;
    }>
  ) {}

  protected _onEdit(): void {
    // THIS TRIGGERS THE CORRECT RENDERING
    this._state.set({
      /*mode: 'edit'*/
    });
  }
}
