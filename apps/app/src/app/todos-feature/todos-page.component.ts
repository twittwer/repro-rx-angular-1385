import { CdkTableModule } from '@angular/cdk/table';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TrackByFunction,
} from '@angular/core';
import { LetModule } from '@rx-angular/template';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SidebarUiModule } from '../sidebar-ui';
import { DescriptionPanelComponent } from './description-panel.component';
import { Todo } from './todo';

interface TodosPageState {
  readonly todos: readonly Todo[];
  readonly activeTodo?: Todo;
}

@Component({
  standalone: true,
  imports: [
    NgIf,
    CdkTableModule,
    LetModule,
    SidebarUiModule,
    DescriptionPanelComponent,
  ],
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
  private readonly _activeTodoId$ = new BehaviorSubject<Todo['id'] | undefined>(
    undefined
  );

  protected readonly _vm$: Observable<TodosPageState> =
    this._activeTodoId$.pipe(
      map((activeTodoId) => ({
        todos: TODOS,
        activeTodo: TODOS.find((todo) => todo.id === activeTodoId),
      }))
    );

  protected readonly _trackById: TrackByFunction<Todo> = (_, todo) => todo.id;

  protected _onRowClick(todo: Todo): void {
    this._activeTodoId$.next(todo.id);
  }
}

const TODOS: Todo[] = [
  {
    id: '1',
    title: 'With Description',
    description: 'Informative Description',
  },
  {
    id: '2',
    title: 'Without Description',
    description: '',
  },
];
