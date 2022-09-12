import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Todo } from './todo';

@Component({
  selector: 'app-description-panel',
  template: `
    <app-panel *rxLet="_state$; let state">
      <app-panel-header> Description </app-panel-header>
      <ng-container *appPanelContent>
        <input
          #input
          type="text"
          [value]="state.value"
          (focus)="_onEdit()"
          (input)="_onInput(input.value)"
          aria-label="Todo Description"
        />
      </ng-container>
    </app-panel>
  `,
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionPanelComponent {
  public readonly _state$ = this._state.select();

  @Input()
  public set todo(todo: Todo) {
    this._state.set({ /*mode: 'view',*/ value: todo.description ?? '' });
  }

  constructor(
    private readonly _state: RxState<{
      /* mode: 'view' | 'edit'; */ value: string;
    }>
  ) {}

  public _onEdit() {
    // THIS TRIGGERS THE CORRECT RENDERING
    this._state.set({
      /*mode: 'edit'*/
    });
  }

  public _onInput(value: string): void {
    this._state.set({ value });
  }
}
