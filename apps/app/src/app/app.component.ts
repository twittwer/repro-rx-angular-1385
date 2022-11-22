import { Component } from '@angular/core';
import { SidebarUiModule } from './sidebar-ui';
import { TodosPageComponent } from './todos-feature';

@Component({
  standalone: true,
  imports: [TodosPageComponent, SidebarUiModule],
  selector: 'app-root',
  template: `
    <app-todos-page></app-todos-page>
    <app-sidebar></app-sidebar>
  `,
})
export class AppComponent {}
