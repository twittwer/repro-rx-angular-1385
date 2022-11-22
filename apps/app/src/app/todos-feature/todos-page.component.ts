import {
  ChangeDetectionStrategy,
  Component,
  TrackByFunction,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import {
  selectTodosPageState,
  TodosPageState,
} from './todos-page.component.selectors';

@Component({
  selector: 'app-todos-page',
  template: `
    <ng-container *rxLet="_vm$; let vm">
      <table cdk-table [dataSource]="vm.todos" [trackBy]="_trackById">
        <ng-container cdkColumnDef="title">
          <td *cdkCellDef="let todo" cdk-cell>{{ todo.title }}</td>
        </ng-container>

        <tr
          *cdkRowDef="let todo; columns: ['title']; let index = index"
          cdk-row
          [style.background]="
            vm.activeTodo && vm.activeTodo.id === todo.id
              ? 'lightblue'
              : undefined
          "
          (click)="_onRowClick(todo)"
        ></tr>
      </table>

      <ng-container *appSidebar>
        <ng-container *ngIf="vm.activeTodo">
          <h2>{{ vm.activeTodo.title }}</h2>
          <app-description-panel [todo]="vm.activeTodo"></app-description-panel>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
  styles: [
    `
      :host {
        padding: 1rem;
      }

      table {
        width: 100%;
        border: 1px solid lightgrey;
      }

      tr {
        height: 50px;
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosPageComponent {
  protected readonly _vm$: Observable<TodosPageState> =
    this._store.select(selectTodosPageState) /*.pipe(debounceTime(0))*/;

  protected readonly _trackById: TrackByFunction<Todo> = (_, todo) => todo.id;

  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}

  protected _onRowClick(todo: Todo): void {
    this._router.navigate(['/', todo.id], { replaceUrl: true });
  }
}
