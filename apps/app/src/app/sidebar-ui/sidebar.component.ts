import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { LetModule } from '@rx-angular/template';
import { tap } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';

@Component({
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, LetModule],
  selector: 'app-sidebar',
  template: `
    <ng-container *rxLet="_templateRef$; let templateRef">
      <ng-container
        *ngIf="templateRef"
        [ngTemplateOutlet]="templateRef"
      ></ng-container>
    </ng-container>
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
