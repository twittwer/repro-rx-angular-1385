import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, NgTemplateOutlet],
  selector: 'app-sidebar',
  template: `
    <ng-container
      *ngIf="_templateRef$ | async as templateRef"
      [ngTemplateOutlet]="templateRef"
    ></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @HostBinding('hidden')
  protected _isHidden = true;

  protected readonly _templateRef$ = inject(SidebarService)
    .selectTemplate()
    .pipe(
      tap((templateRef) => {
        this._isHidden = !templateRef;
      })
    );
}
