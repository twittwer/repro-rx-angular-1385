import { Directive, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Directive({
  selector: '[appSidebar]',
})
export class SidebarDirective implements OnInit, OnDestroy {
  constructor(
    private readonly sidebarService: SidebarService,
    private readonly templateRef: TemplateRef<unknown>
  ) {}

  public ngOnInit() {
    this.sidebarService.setTemplate(this.templateRef);
  }

  public ngOnDestroy() {
    this.sidebarService.setTemplate(undefined);
  }
}
