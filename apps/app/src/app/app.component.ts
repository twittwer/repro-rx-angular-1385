import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar-ui';
import { TodosPageComponent } from './todos-feature';

@Component({
  standalone: true,
  imports: [TodosPageComponent, SidebarComponent],
  selector: 'app-root',
  template: `
    <app-todos-page></app-todos-page>
    <app-sidebar></app-sidebar>
  `,
})
export class AppComponent {}
