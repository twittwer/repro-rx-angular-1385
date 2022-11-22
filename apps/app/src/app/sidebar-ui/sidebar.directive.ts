import {
  Directive,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { SidebarService } from './sidebar.service';

@Directive({
  standalone: true,
  selector: '[appSidebar]',
})
export class SidebarDirective implements OnInit, OnDestroy {
  private readonly _templateRef = inject(TemplateRef);
  private readonly _sidebarService = inject(SidebarService);

  public ngOnInit() {
    this._sidebarService.setTemplate(this._templateRef);
  }

  public ngOnDestroy() {
    this._sidebarService.setTemplate(undefined);
  }
}
