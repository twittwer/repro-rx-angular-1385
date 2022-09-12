import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <ng-container *ngIf="templateRef$ | async as templateRef">
      <ng-container *ngTemplateOutlet="templateRef"></ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @HostBinding('hidden')
  public isHidden = true;

  public templateRef$ = this.sidebarService.selectTemplate().pipe(
    tap((templateRef) => {
      this.isHidden = !templateRef;
    })
  );

  constructor(private readonly sidebarService: SidebarService) {}
}
